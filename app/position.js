class Position {
  constructor(x, y) {
    this.x_ = x;
    this.y_ = y;
  }

  getDistance(point) {
    if (point instanceof Position) {
      let value = Math.pow(this.x_ - point.x, 2);
      value += Math.pow(this.y_ - point.y, 2);
      value = Math.sqrt(value);
      return value;
    }
    return 0;
  }

  get x() {
    return this.x_;
  }

  get y() {
    return this.y_;
  }
}

module.exports = {Position};
