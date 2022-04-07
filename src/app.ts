import "../style.css";
import "./util/canvasFunction";
import Lion from "./characters/lion";
import Ripple from "./ripple";

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

  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
    this.lion = new Lion(this.center);
    window.requestAnimationFrame(this.animate.bind(this));
    window.addEventListener("click", this.onClick.bind(this));
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
