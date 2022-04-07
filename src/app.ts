import "../style.css";
import "./util/canvasFunction";
import Lion from "./characters/lion";
import Ripple from "./ripple";
import Footer from "./footer";
import Header from "./header";

class App {
  canvas: HTMLCanvasElement;
  pixelRatio: number;
  stageWidth: number;
  stageHeight: number;
  center: { x: number; y: number };
  lion: Lion;
  ctx: CanvasRenderingContext2D | null;
  ripple: Ripple;
  drawLion: boolean;
  header: Header;
  footer: Footer;

  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
    this.lion = new Lion(this.center);
    window.requestAnimationFrame(this.animate.bind(this));
    this.canvas.addEventListener("click", this.onClick.bind(this));

    this.header = new Header();
    this.header.render();
    this.footer = new Footer(this.fullScreen.bind(this));
    this.footer.render();
  }

  fullScreen(e: Event) {
    e.preventDefault();
    console.log(e);
    if (!document.fullscreenElement) {
      document.body.requestFullscreen();
      this.footer.changeText(true);
    }
    if (document.exitFullscreen) {
      document.exitFullscreen();
      this.footer.changeText(false);
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
  }

  onClick(e: MouseEvent) {
    if (!this.ripple) {
      this.ripple = new Ripple(e.clientX, e.clientY, this.stageWidth, this.stageHeight);
      this.ripple.start(this.ctx!);
    } else {
      this.ripple.reset(e.clientX, e.clientY);
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.lion.draw(this.ctx!);
    if (this.ripple) {
      this.ripple.animate();
    }
  }
}

window.onload = () => {
  const app = new App();
};
