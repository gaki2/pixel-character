type COLORTYPE = {
  r: number;
  g: number;
  b: number;
};
const Acc = 0.15;
export default class Dot {
  x: number;
  y: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  pixelNum: number;
  color: COLORTYPE;
  lastY: boolean;
  radius: number;
  radiusM: number;
  radiusV: number;
  lastX: boolean;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    lastY: boolean,
    lastX: boolean,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.pixelNum = this.width * this.height;
    this.ctx = ctx;
    this.lastY = lastY;
    this.lastX = lastX;
    this.color = this.getColor(
      this.ctx.getImageData(this.x * window.devicePixelRatio, this.y * window.devicePixelRatio, this.width, this.height)
        .data,
    );
    this.radius = 0;
    this.radiusM = 30;
    this.radiusV = 0;
  }

  // 좌상단, 우하단, 가운데 픽셀값의 평균으로 색깔을 결정함
  getColor(imgData: Uint8ClampedArray) {
    const avgRgba: COLORTYPE = {
      r: 0,
      g: 0,
      b: 0,
    };
    if (this.lastY || this.lastX) {
      const color = imgData.slice(0, 4);
      return {
        r: color[0],
        g: color[1],
        b: color[2],
      };
    }

    for (let i = 0; i < this.pixelNum; i += 3) {
      const nowRgba = imgData.slice(i * 4, (i + 1) * 4);
      avgRgba.r += nowRgba[0] / Math.floor(this.pixelNum / 3);
      avgRgba.g += nowRgba[1] / Math.floor(this.pixelNum / 3);
      avgRgba.b += nowRgba[2] / Math.floor(this.pixelNum / 3);
    }
    Object.keys(avgRgba).forEach((key) => {
      avgRgba[key as keyof COLORTYPE] = Math.floor(avgRgba[key as keyof COLORTYPE]);
    });
    return avgRgba;
  }

  draw() {
    const accel = (this.radiusM - this.radius) / 2;
    this.radiusV += accel;
    this.radiusV *= Acc;
    this.radius += this.radiusV;
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(0,0,0,0.9)";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
    this.ctx.roundRect(this.x, this.y, this.radius, this.radius, 5);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
