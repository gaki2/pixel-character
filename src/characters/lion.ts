import { COLOR } from "../util/colors";

type Center = {
  x: number;
  y: number;
};
const PI2 = Math.PI * 2;

export default class Lion {
  center: Center;
  expression: string;
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
  };

  constructor(center: Center) {
    this.color = COLOR;
    this.center = center;
    this.expression = "normal";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.lineWidth = 3;
    ctx.translate(this.center.x, this.center.y);
    ctx.scale(10, 10);
    this.drawArms(ctx);
    this.drawLegs(ctx);
    this.drawBody(ctx);
    this.drawHead(ctx);
    ctx.restore();
  }

  drawArms(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color.BROWN;
    // 오른팔
    ctx.beginPath();
    ctx.ellipse(-18, +55, 40, 12, (140 * Math.PI) / 180, 0, PI2, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    // 왼팔
    ctx.beginPath();
    ctx.ellipse(+18, +55, 40, 12, (40 * Math.PI) / 180, 0, PI2, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  drawLegs(ctx: CanvasRenderingContext2D) {
    // 왼쪽 다리
    ctx.fillStyle = this.color.BROWN;
    ctx.beginPath();
    ctx.ellipse(-15, +110, 22, 12, (90 * Math.PI) / 180, 0, PI2, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    // 오른쪽 다리
    ctx.beginPath();
    ctx.ellipse(+15, +110, 22, 12, (90 * Math.PI) / 180, 0, PI2, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  drawBody(ctx: CanvasRenderingContext2D) {
    // 몸통
    const body: CanvasRenderingContext2D = ctx.roundRect(-37.5, +40, 75, 70, 30);
    body.fill();
    body.stroke();
    // 흰 배
    ctx.fillStyle = this.color.WHITE;
    const white = ctx.roundRect(-20, +57, 40, 40, 17);
    white.fill();
    white.stroke();
  }

  drawHead(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color.BROWN;
    // 왼쪽 귀
    ctx.beginPath();
    //  ctx.lineCap = "round";
    ctx.arc(-27, -33, 16, 0, PI2, true);
    //  ctx.fill();
    //  ctx.stroke();
    //  ctx.closePath();
    ctx.moveTo(+43, -33);
    // 오른쪽 귀
    ctx.arc(+27, -33, 16, 0, PI2, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // 귀 안
    ctx.fillStyle = this.color.BROWN;
    ctx.beginPath();
    ctx.arc(-27, -33, 10, 0, PI2, true);
    ctx.moveTo(+37, -33);
    ctx.arc(+27, -33, 10, 0, PI2, true);
    ctx.fill();
    ctx.closePath();

    // 머리통
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.ellipse(0, 0, 50, 44.5, 0, 0, PI2, true);
    ctx.stroke();
    ctx.fill();
    // 왼쪽 눈썹
    ctx.moveTo(-35, -20);
    ctx.lineTo(-13, -20);
    ctx.moveTo(+35, -20);
    ctx.lineTo(+13, -20);
    ctx.stroke();
    // 눈
    ctx.closePath();
    ctx.beginPath();
    if (this.expression === "normal") {
      ctx.moveTo(-23, -6);
      ctx.arc(-23, -6, 3.5, 0, PI2, true);
      ctx.moveTo(+23, -6);
      ctx.arc(+23, -6, 3.5, 0, PI2, true);
    } else if (this.expression === "fun") {
      ctx.moveTo(-26, -6);
      ctx.quadraticCurveTo(-23, -10, -20, -6);
      ctx.moveTo(+26, -6);
      ctx.quadraticCurveTo(+23, -10, +20, -6);
    } else if (this.expression === "sleep") {
      ctx.moveTo(-26, -6);
      ctx.quadraticCurveTo(-23, -2, -20, -6);
      ctx.moveTo(+26, -6);
      ctx.quadraticCurveTo(+23, -2, +20, -6);
    } else if (this.expression === "wow") {
      ctx.moveTo(-16, -6);
      ctx.lineTo(-30, -9);
      ctx.moveTo(-16, -6);
      ctx.lineTo(-30, -3);
      ctx.moveTo(+16, -6);
      ctx.lineTo(+30, -9);
      ctx.moveTo(+16, -6);
      ctx.lineTo(+30, -3);
    }
    ctx.fillStyle = this.color.BLACK;
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = this.color.WHITE;
    ctx.beginPath();
    ctx.arc(-5, +12.4, 8, 0, PI2, true);
    ctx.arc(+5, +12.4, 8, 0, PI2, true);
    ctx.fill();

    // 코 중앙
    ctx.beginPath();
    ctx.fillStyle = this.color.BLACK;
    ctx.moveTo(0, +6);
    ctx.arc(0, +6, 4, 0, PI2, true);
    ctx.fill();
    ctx.closePath();
  }
}
