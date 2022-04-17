import "../style.css";
import "./util/canvasFunction";
import Lion from "./characters/lion";
import Ripple from "./ripple";
import Footer from "./footer";
import Header from "./header";
import Apeach from "./characters/apeach";
import SideButton from "./sideButton";
import CircularQueue from "./circularQueue";
import { THEME } from "./util/colors";
import Tube from "./characters/tube";

type CHARACTER = Lion | Apeach | Tube;

class App {
  canvas: HTMLCanvasElement;
  pixelRatio: number;
  stageWidth: number;
  stageHeight: number;
  center: { x: number; y: number };
  lion: Lion;
  ctx: CanvasRenderingContext2D | null;
  ripple: Ripple | null;
  drawLion: boolean;
  header: Header;
  footer: Footer;
  apeach: Apeach;
  sideBtn: SideButton;
  scale: number;
  nowCharacter: CHARACTER;
  characters: string[];
  circularQueue: CircularQueue<string>;
  tube: Tube;
  themeColor: string;
  timer: any;

  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.resize();
    this.lion = new Lion(this.center);
    this.apeach = new Apeach(this.center);
    this.tube = new Tube(this.center);
    this.characters = ["lion", "apeach", "tube"];
    this.circularQueue = new CircularQueue<string>(this.characters);

    this.header = new Header();
    this.header.render();
    this.footer = new Footer(this.fullScreen.bind(this));
    this.footer.render();
    this.sideBtn = new SideButton(
      this.pixelize.bind(this),
      this.changeScale.bind(this),
      this.changeCharacter.bind(this),
      this.noPixelize.bind(this),
    );
    this.sideBtn.render(document.body);
    this.nowCharacter = this.lion;
    this.timer = null;

    window.addEventListener("resize", this.resize.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    window.addEventListener("wheel", this.Zoom.bind(this));
  }

  Zoom(e: WheelEvent) {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(() => {
      if (e.deltaY < 0) {
        this.changeScale(true); // 확대
      } else {
        this.changeScale(false); // 축소
      }
    }, 10);
  }

  fullScreen(e: Event) {
    e.preventDefault();
    if (!document.fullscreenElement) {
      document.body.requestFullscreen();
      this.footer.changeText(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      this.footer.changeText(false);
    }
    this.noPixelize();
  }

  pixelize() {
    if (!this.ripple) {
      this.ripple = new Ripple(this.stageWidth, this.stageHeight);
      this.ripple.pixelize(this.ctx!);
    } else {
      this.ripple.reset();
    }
  }

  changeScale(isUp: boolean) {
    if (isUp) {
      this.nowCharacter.addScale();
    } else {
      this.nowCharacter.reduceScale();
    }
    this.noPixelize();
  }

  noPixelize() {
    this.ripple = null;
  }

  changeCharacter() {
    this.ripple = null;
    const nextCharacter = this.circularQueue.next();
    switch (nextCharacter) {
      case "lion":
        this.nowCharacter = this.lion;
        break;
      case "apeach":
        this.nowCharacter = this.apeach;
        break;
      case "tube":
        this.nowCharacter = this.tube;
        break;
      default:
        break;
    }
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx!.scale(this.pixelRatio, this.pixelRatio);
    this.center = {
      x: this.stageWidth / 2,
      y: this.stageHeight / 2,
    };
    this.noPixelize();
    if (this.lion) {
      this.lion.resize(this.center);
      this.apeach.resize(this.center);
    }
  }

  changeThemeColor() {
    this.themeColor = THEME[this.nowCharacter.name as keyof typeof THEME];
    this.ctx!.fillStyle = this.themeColor;
    document.body.style.backgroundColor = this.themeColor;
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.changeThemeColor();
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx?.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.nowCharacter.draw(this.ctx!);
    if (this.ripple) {
      this.ripple.animate();
    }
  }
}

window.onload = () => {
  const app = new App();
};
