import { COLOR } from "../util/colors";

type Center = {
  x: number;
  y: number;
};
const PI2 = Math.PI * 2;

export default class Apeach {
  center: Center;
  color: {
    BROWN: string;
    GREEN: string;
    BLUE: string;
    PINK: string;
    ORANGE: string;
    GRAY: string;
    YELLOW: string;
    BLACK: string;
    WHITE: string;
    MILDPINK: string;
    RED: string;
  };
  scale: { max: number; min: number; now: number };
  name: string;

  constructor(center: Center) {
    this.name = "apeach";
    this.color = COLOR;
    this.center = center;
    this.scale = {
      max: 4,
      min: 1,
      now: 1,
    };
  }

  resize(center: Center) {
    this.center.x = center.x;
    this.center.y = center.y;
  }

  addScale() {
    if (this.scale.now !== this.scale.max) {
      this.scale.now += 1;
    }
  }

  reduceScale() {
    if (this.scale.now !== this.scale.min) {
      this.scale.now -= 1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.lineWidth = 3;
    ctx.translate(this.center.x, this.center.y);
    ctx.scale(this.scale.now, this.scale.now);
    this.drawHead(ctx);
    this.drawEyes(ctx);
    this.drawBall(ctx);
    this.drawMouse(ctx);
    this.drawTeeth(ctx);
    ctx.restore();
  }

  drawHead(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    // ctx.lineJoin = "round";
    ctx.lineCap = "butt";
    ctx.fillStyle = this.color.PINK;
    ctx.lineWidth = 10;
    ctx.moveTo(0, -200);
    ctx.bezierCurveTo(90, -200, 230, -50, 238, 40);
    ctx.bezierCurveTo(238, 110, 186, 221, 0, 221);
    ctx.bezierCurveTo(-186, 221, -238, 110, -238, 40);
    ctx.bezierCurveTo(-238, -50, -90, -200, 0, -200);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  drawEyes(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color.BLACK;
    ctx.arc(-65, 9, 14, 0, PI2);
    ctx.arc(65, 9, 14, 0, PI2);
    ctx.fill();
    ctx.closePath();
  }

  drawBall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color.MILDPINK;
    ctx.ellipse(-135, 65, 52, 42, 0, 0, PI2);
    ctx.ellipse(135, 65, 52, 42, 0, 0, PI2);
    ctx.fill();
    ctx.closePath();
  }

  drawMouse(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color.RED;
    ctx.moveTo(0, 49);
    ctx.bezierCurveTo(20, 49, 30, 43, 42, 43);
    ctx.bezierCurveTo(58, 43, 62, 60, 62, 63);
    ctx.bezierCurveTo(62, 67, 60, 107, 0, 107);
    ctx.bezierCurveTo(-60, 107, -62, 67, -62, 63);
    ctx.bezierCurveTo(-62, 60, -58, 43, -42, 43);
    ctx.bezierCurveTo(-30, 43, -20, 49, 0, 49);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  drawTeeth(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.fillStyle = this.color.WHITE;
    ctx.moveTo(42, 43);
    ctx.bezierCurveTo(42, 70, 0, 65, 0, 65);
    ctx.bezierCurveTo(0, 65, -42, 70, -42, 43);
    ctx.bezierCurveTo(-30, 43, -20, 49, 0, 49);
    ctx.bezierCurveTo(20, 49, 30, 43, 42, 43);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}
