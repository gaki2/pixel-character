import "../style.css";

class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  pixelRatio: number;
  stageWidth: number;
  stageHeight: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx?.scale(this.pixelRatio, this.pixelRatio);
  }
}

window.onload = () => {
  const app = new App();
};
