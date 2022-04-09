import "../style.css";
import "./util/canvasFunction";
import Lion from "./characters/lion";
import Ripple from "./ripple";
import Footer from "./footer";
import Header from "./header";
import Apeach from "./characters/apeach";
import SideButton from "./sideButton";

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
  nowCharacter: Lion | Apeach;

  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.resize();
    this.lion = new Lion(this.center);
    this.apeach = new Apeach(this.center);

    window.requestAnimationFrame(this.animate.bind(this));
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
    window.addEventListener("resize", this.resize.bind(this));
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
    if (this.nowCharacter === this.lion) {
      this.nowCharacter = this.apeach;
    } else {
      this.nowCharacter = this.lion;
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

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    if (this.nowCharacter === this.lion) {
      this.ctx!.fillStyle = "rgb(127, 255, 212)";
    } else {
      this.ctx!.fillStyle = "#ffcdd2";
    }
    this.ctx?.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.nowCharacter.draw(this.ctx!);
    // this.apeach.draw(this.ctx!);
    if (this.ripple) {
      this.ripple.animate();
    }
  }
}

window.onload = () => {
  const app = new App();
};
