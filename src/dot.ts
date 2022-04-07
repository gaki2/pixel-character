export default class Dot {
  x: number;
  y: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  color: Uint8ClampedArray;
  avgRgba: { r: number; g: number; b: number; a: number };
  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.color = this.ctx.getImageData(this.x, this.y, this.width, this.height).data;
    this.avgRgba = {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
    };

    for (let i = 0; i < this.width * this.height; i += 1) {
      const nowRgba = this.color.slice(i * 4, (i + 1) * 4);
      this.avgRgba.r += nowRgba[0] / (this.width * this.height);
      this.avgRgba.g += nowRgba[1] / (this.width * this.height);
      this.avgRgba.b += nowRgba[2] / (this.width * this.height);
      this.avgRgba.a += nowRgba[3] / (this.width * this.height) / 255;
    }
    // 색깔을 처음 픽셀의 색깔로 해서 오차가 생김. (첫값, 끝값, 중간값 2개로의 평균으로 해야할듯);
    // if (this.color[0] == 0 && this.color[1] == 0 && this.color[2] == 0 && this.color[3] == 0) {
    //   this.color[0] = 125;
    //   this.color[1] = 255;
    //   this.color[2] = 212;
    //   this.color[3] = 1;
    // }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(100,100,200,0.4)";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = `rgba(${this.avgRgba.r}, ${this.avgRgba.g}, ${this.avgRgba.b}, ${this.avgRgba.a})`;
    this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width * 0.3, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
