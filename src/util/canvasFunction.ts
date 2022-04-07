CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  const width = w;
  let radius = r;
  if (w < 2 * r) radius = width / 2;
  if (h < 2 * r) radius = h / 2;
  this.beginPath();
  this.moveTo(x + radius, y);
  this.arcTo(x + w, y, x + w, y + h, radius);
  this.arcTo(x + w, y + h, x, y + h, radius);
  this.arcTo(x, y + h, x, y, radius);
  this.arcTo(x, y, x + w, y, radius);
  this.closePath();
  return this;
};
