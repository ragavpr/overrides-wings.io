export class ParticleDust {
  x = 0;
  y = 0;
  z = Math.random() + 0.3;
  size = 1.2;
  opacity = 0.8 * Math.random() + 0.1;
  update(e: any) {
    if (0 == this.x || 0 == this.y) {
      this.x = Math.random() * (e[1].x - e[0].x) + e[0].x;
      this.y = Math.random() * (e[1].y - e[0].y) + e[0].y;
    }
    let f = e[1].x - e[0].x,
      d = e[1].y - e[0].y;
    this.x < e[0].x && (this.x += Math.ceil((e[0].x - this.x) / f) * f);
    this.y < e[0].y && (this.y += Math.ceil((e[0].y - this.y) / d) * d);
    this.x > e[1].x && (this.x -= Math.ceil((this.x - e[1].x) / f) * f);
    this.y > e[1].y && (this.y -= Math.ceil((this.y - e[1].y) / d) * d);
  }
  draw(e: any) {
    e.fillStyle = "rgba(226,219,226," + this.opacity + ")";
    e.beginPath();
    e.arc(this.x, this.y, this.z * this.size, 0, 2 * Math.PI, true);
    e.closePath();
    e.fill();
  }
}
