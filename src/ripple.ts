import Dot from "./dot";
import { collide } from "./util/utils";
// 왼쪽에서 오른쪽으로 움직이는 ripple
export default class Ripple {
  speed: number;
  dotWidth: number;
  stageHeight: number;
  stageWidth: number;
  dots: Dot[];
  pos: { x: number };
  pixelRatio: number;
  acc: number;

  constructor(stageWidth: number, stageHeight: number) {
    this.pos = {
      x: 0,
    };
    this.speed = 40;
    this.dotWidth = 30;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.dots = [];
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.acc = 1.04;
  }

  reset() {
    this.pos.x = 0;
    this.speed = 40;
  }

  pixelize(ctx: CanvasRenderingContext2D) {
    this.dots = [];
    let lastY = false;
    let lastX = false;
    for (let y = 0; y < Math.ceil(this.stageHeight / this.dotWidth) + 1; y += 1) {
      for (let x = 0; x < Math.ceil(this.stageWidth / this.dotWidth) + 1; x += 1) {
        if (y * this.dotWidth + this.dotWidth >= this.stageHeight) {
          lastY = true;
        }
        if (x * this.dotWidth + this.dotWidth >= this.stageWidth) {
          lastX = true;
        } else {
          lastX = false;
        }
        const dot = new Dot(
          x * this.dotWidth,
          y * this.dotWidth,
          this.dotWidth,
          this.dotWidth,
          ctx,
          lastY,
          lastX,
          this.pixelRatio,
        );
        this.dots.push(dot);
      }
    }
  }

  animate() {
    this.speed *= this.acc;
    this.pos.x += this.speed;
    for (let i = 0; i < this.dots.length; i += 1) {
      if (collide(this.pos.x, this.dots[i].x)) {
        this.dots[i].draw();
      }
    }
  }
}
