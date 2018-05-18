require('dotenv')
  .config({path: '/home/alexandre/WebstormProjects/TP-Batman/data.env'});

const {Rider, LightSoldier, HeavySoldier} = require('./units.js');

class Polis {
  constructor(namePolis, divinity, position) {
    this.name_ = namePolis || 'UNKPOLIS';
    this.corn_ = Number(1000);
    this.gold_ = 1000;
    this.unitList_ = [];
    this.polisDivinity_ = divinity;
    this.position_ = position;
  }

  init() {
    this.dailyGain = setInterval(() => {
      this.corn_ += Number(process.env.DAILY_EARNING_CORN);
      this.gold_ += Number(process.env.DAILY_EARNING_GOLD);
    }, Number(process.env.TIME_FACTOR));
  }

  createRider() {
    return new Promise((resolve, reject) => {
      if (this.corn - Rider.cornCost >= 0 && this.gold - Rider.goldCost >= 0) {
        this.corn_ -= Rider.cornCost;
        this.gold_ -= Rider.goldCost;
        setTimeout(() => {
          this.unitList_.push(new Rider());
          resolve();
        }, 12 * Number(process.env.TIME_FACTOR));
      } else {
        reject(new Error(`Manque de ressources pour acheter ce type d'unité`));
      }
    });
  }

  doCommerceWith(otherPolis, cornSended, goldSended){
    return new Promise((resolve,reject) => {
      const travelDuration = this.position_.getDistance(otherPolis.position);
      const cornGain = cornSended * (1 + 0.1* travelDuration);
      const goldGain = goldSended * (1 + 0.1* travelDuration);
    });
  }

  createLightSoldier() {
    return new Promise((resolve, reject) => {
      if (this.corn - LightSoldier.cornCost >= 0 && this.gold -
        LightSoldier.goldCost >= 0) {
        this.corn_ -= LightSoldier.cornCost;
        this.gold_ -= LightSoldier.goldCost;
        setTimeout(() => {
          this.unitList_.push(new LightSoldier());
          resolve();
        }, 10 * Number(process.env.TIME_FACTOR));
      } else {
        reject(new Error(`Manque de ressources pour acheter ce type d'unité`));
      }
    });
  }

  createHeavySoldier() {
    return new Promise((resolve, reject) => {
      if (this.corn - HeavySoldier.cornCost >= 0 && this.gold -
        HeavySoldier.goldCost >= 0) {
        this.corn_ -= HeavySoldier.cornCost;
        this.gold_ -= HeavySoldier.goldCost;
        setTimeout(() => {
          this.unitList_.push(new HeavySoldier());
          resolve();
        }, 15 * Number(process.env.TIME_FACTOR));
      } else {
        reject(new Error(`Manque de ressources pour acheter ce type d'unité`));
      }
    });
  }

  get corn() {
    return this.corn_;
  }

  get gold() {
    return this.gold_;
  }

  get position() {
    return this.position_;
  }

  get name() {
    return this.name_;
  }
}

module.exports = {Polis};
