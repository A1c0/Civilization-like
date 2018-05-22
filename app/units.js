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

  get HP() {
    return 0;
  }

  get attackSpeed() {
    return 0;
  }

  get attackValue() {
    return 0;
  }

  static get cornCost() {
    return 0;
  }

  static get goldCost() {
    return 0;
  }

  set wounded(value) {
    this.wounded_ = value;
  }

  set dead(value) {
    this.dead_ = value;
  }

  set defensing(value) {
    this.defensing_ = value;
  }

  bioDeath() {
    setTimeout(() => {
      this.dead_ = true;
    }, 100 * process.env.TIME_FACTOR);
  }

  toString() {
    let text = '';
    if (this.isDefensing()) {
      text += ' D ';
    }
    if (this.isWounded()) {
      text += ' W ';
    }
    return text;
  }
}

class Rider extends Units {
  get HP() {
    return 25;
  }

  get attackSpeed() {
    return 2;
  }

  get attackValue() {
    return 2;
  }

  static get cornCost() {
    return 300;
  }

  static get goldCost() {
    return 20;
  }

  toString() {
    let text = String('Rider ' + this.HP + '\\' + this.attackValue + '\\' +
      this.attackSpeed);
    text += super.toString();
    return text;
  }
}

class LightSoldier extends Units {
  get HP() {
    return 15;
  }

  get attackSpeed() {
    return 1;
  }

  get attackValue() {
    return 3;
  }

  static get cornCost() {
    return 100;
  }

  static get goldCost() {
    return 0;
  }

  toString() {
    let text = String('Light Soldier ' + this.HP + '\\' +
      this.attackValue + '\\' + this.attackSpeed);
    text += super.toString();
    return text;
  }
}

class HeavySoldier extends Units {
  get HP() {
    return 20;
  }

  get attackSpeed() {
    return 5;
  }

  get attackValue() {
    return 1;
  }

  static get cornCost() {
    return 200;
  }

  static get goldCost() {
    return 10;
  }

  toString() {
    let text = String('Heavy Soldier ' + this.HP + '\\' +
      this.attackValue + '\\' + this.attackSpeed);
    text += super.toString();
    return text;
  }
}

module.exports = {Rider, LightSoldier, HeavySoldier};
