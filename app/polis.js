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

  doCommerceWith(otherPolis, cornSended, goldSended) {
    return new Promise((resolve, reject) => {
      if (cornSended <= this.corn_ && goldSended <= this.gold_) {
        this.corn_ -= cornSended;
        this.gold_ -= goldSended;
        const travelDuration = Math.floor(this.position_.getDistance(
          otherPolis.position) * 2);
        let cornGain = cornSended * (1 + (0.1 * travelDuration));
        let goldGain = goldSended * (1 + (0.1 * travelDuration));
        let counter = 0;
        const timeTravel = setInterval(() => {
          if (Math.random() <= 0.05) { // 1 chance sur 20 de se faire detrousser
            cornGain = 0;
            goldGain = 0;
            clearInterval(timeTravel);
            resolve();
          } else {
            counter++;
            if (counter === travelDuration) {
              // Le voyage est terminé et s'est bien passé
              this.corn_ += cornGain;
              this.gold_ += goldGain;
              clearInterval(timeTravel);
              resolve();
            }
          }
        }, Number(process.env.TIME_FACTOR));
      } else {
        reject(new Error(`Pas assez de ressource pour faire ce commerce`));
      }
    });
  }

  setDefenseTroop(nbLightSoldier, nbHeavySoldier, nbRider) {
    return new Promise((resolve, reject) => {
      let counterLightSoldier = 0;
      let counterHeavySoldier = 0;
      let counterRider = 0;
      this.unitList_.forEach(unit => {
        if (unit instanceof LightSoldier) {
          counterLightSoldier++;
        }
        if (unit instanceof HeavySoldier) {
          counterHeavySoldier++;
        }
        if (unit instanceof Rider) {
          counterRider++;
        }
      });
      if (counterLightSoldier >= nbLightSoldier && counterHeavySoldier >=
        nbHeavySoldier && counterRider >= nbRider) {
        counterLightSoldier = 0;
        counterHeavySoldier = 0;
        counterRider = 0;

        this.unitList_.forEach(unit => {
          if (unit instanceof LightSoldier) {
            if (counterLightSoldier < nbLightSoldier) {
              unit.defensing = true;
              counterLightSoldier++;
            }
          }
          if (unit instanceof HeavySoldier) {
            if (counterHeavySoldier < nbHeavySoldier) {
              unit.defensing = true;
              counterHeavySoldier++;
            }
          }
          if (unit instanceof Rider) {
            if (counterRider < nbRider) {
              unit.defensing = true;
              counterRider++;
            }
          }
        });
      } else {
        reject(new Error('Pas assez de troupe pour envoyer cette attaque'));
      }
    });
  }

  attackOtherPolis(otherPolis) {

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
