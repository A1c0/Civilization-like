class Units {
  constructor() {
    this.wounded_ = false;
    this.dead_ = false;
    this.defensing_ = false;
    this.bioDeath();
  }

  isWounded() {
    return this.wounded_;
  }

  isDefensing() {
    return this.defensing_;
  }

  isDead() {
    return this.dead_;
  }

  bioDeath() {
    setTimeout(() => {
      this.dead_ = true;
    }, 100 * process.env.TIME_FACTOR);
  }
}

class Rider extends Units {
  static get HP() {
    return 25;
  }

  static get attackSpeed() {
    return 2;
  }

  static get attackValue() {
    return 2;
  }

  static get cornCost() {
    return 300;
  }

  static get goldCost() {
    return 20;
  }
}

class LightSoldier extends Units {
  static get HP() {
    return 15;
  }

  static get attackSpeed() {
    return 1;
  }

  static get attackValue() {
    return 3;
  }

  static get cornCost() {
    return 100;
  }

  static get goldCost() {
    return 0;
  }
}

class HeavySoldier extends Units {
  static get HP() {
    return 20;
  }

  static get attackSpeed() {
    return 3;
  }

  static get attackValue() {
    return 1;
  }

  static get cornCost() {
    return 200;
  }

  static get goldCost() {
    return 10;
  }
}

module.exports = {Units, Rider, LightSoldier, HeavySoldier};
