import { COLOR } from "../util/colors";

type Center = {
  x: number;
  y: number;
};

export default class Tube {
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
  scale: { min: number; max: number; now: number };
  name: string;

  constructor(center: Center) {
    this.name = "tube";
    this.color = COLOR;
    this.center = center;
    this.scale = {
      min: 1,
      max: 10,
      now: 2,
    };
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
    ctx.beginPath();
    this.drawHead(ctx);
    this.drawEye(ctx);
    this.drawEyeBrow(ctx);
    this.drawMouse(ctx);
    this.drawNose(ctx);
    ctx.closePath();
    ctx.restore();
  }

  drawHead(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = this.color.BLACK;
    ctx.fillStyle = this.color.WHITE;
    ctx.moveTo(0, -100);
    const x = 99;
    ctx.bezierCurveTo(70, -100, x, -55, x, -20);
    ctx.bezierCurveTo(x, 40, 70, 75, 0, 75);
    ctx.bezierCurveTo(-70, 75, -x, 40, -x, -20);
    ctx.bezierCurveTo(-x, -55, -70, -100, 0, -100);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  drawEye(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color.BLACK;
    const x = 42;
    ctx.arc(x, -28, 5, 0, Math.PI * 2);
    ctx.arc(-x, -28, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  drawEyeBrow(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color.BLACK;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    const x = 59;
    ctx.moveTo(28, -52);
    ctx.quadraticCurveTo((59 + 28) / 2, -60, x, -52);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(-28, -52);
    ctx.quadraticCurveTo(-(59 + 28) / 2, -60, -x, -52);
    ctx.stroke();
    ctx.closePath();
  }

  drawMouse(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = this.color.BLACK;
    ctx.lineWidth = 3;
    ctx.fillStyle = this.color.YELLOW;
    ctx.moveTo(55, 25);
    ctx.bezierCurveTo(50, 43, -100, 40, -100, 20);

    ctx.bezierCurveTo(-100, 0, -70, 5, -85, 5);
    ctx.bezierCurveTo(-85, 3, -40, 10, -40, 5);
    ctx.bezierCurveTo(-40, -35, 40, -30, 33, 5);
    ctx.bezierCurveTo(80, -15, 86, 20, 86, 35);
    ctx.bezierCurveTo(80, 80, -90, 80, -90, 30);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
  drawNose(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color.BLACK;

    ctx.arc(-15, -4, 4, 0, Math.PI * 2);
    ctx.arc(10, -4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
