export {};

declare global {
  interface CanvasRenderingContext2D {
    roundRect(x, y, w, h, r): CanvasRenderingContext2D;
  }
}
