import Dot from "./dot";
import { collide } from "./util/utils";
// 왼쪽에서 오른쪽으로 움직이는 ripple
export default class Ripple {
  center: { x: number; y: number };
  speed: number;
  fixedRadius: number;
  dotWidth: number;
  stageHeight: number;
  stageWidth: number;
  dots: Dot[];

  constructor(x: number, y: number, stageWidth: number, stageHeight: number) {
    this.center = {
      x,
      y,
    };
    this.fixedRadius = 10;
    this.speed = 17;
    this.dotWidth = 30;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.dots = [];
  }

  reset(x: number, y: number) {
    this.center = {
      x,
      y,
    };
  }

  start(ctx: CanvasRenderingContext2D) {
    for (let y = 0; y < this.stageHeight / this.dotWidth + 1; y += 1) {
      for (let x = 0; x < this.stageWidth / this.dotWidth + 1; x += 1) {
        const dot = new Dot(x * this.dotWidth, y * this.dotWidth, this.dotWidth, this.dotWidth, ctx);
        this.dots.push(dot);
      }
    }
  }

  animate() {
    this.center.x += this.speed;
    for (let i = 0; i < this.dots.length; i += 1) {
      if (collide(this.center.x, this.dots[i].x)) {
        this.dots[i].draw();
      }
    }
  }
}
