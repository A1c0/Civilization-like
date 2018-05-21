require('dotenv')
  .config({path: '/home/alexandre/WebstormProjects/TP-Batman/data.env'});

const chalk = require('chalk');

const error = chalk.bold.underline.red;

const {Rider, LightSoldier, HeavySoldier} = require('./units.js');

class Polis {
  constructor(namePolis, divinity, position) {
    this.name_ = namePolis || 'UNKPOLIS';
    this.corn_ = 1000;
    this.gold_ = 100;
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
    return new Promise(resolve => {
      if (this.corn - Rider.cornCost >= 0 && this.gold - Rider.goldCost >= 0) {
        this.corn_ -= Rider.cornCost;
        this.gold_ -= Rider.goldCost;
        setTimeout(() => {
          this.unitList_.push(new Rider());
          this.unitList_[this.unitList_.length - 1].bioDeath();
          resolve();
        }, 12 * Number(process.env.TIME_FACTOR));
      } else {
        console.log(error(`Manque de ressources pour acheter ce type d'unité`));
      }
    });
  }

  createLightSoldier() {
    return new Promise(resolve => {
      if (this.corn - LightSoldier.cornCost >= 0 && this.gold -
        LightSoldier.goldCost >= 0) {
        this.corn_ -= LightSoldier.cornCost;
        this.gold_ -= LightSoldier.goldCost;
        setTimeout(() => {
          this.unitList_.push(new LightSoldier());
          this.unitList_[this.unitList_.length - 1].bioDeath();
          resolve();
        }, 10 * Number(process.env.TIME_FACTOR));
      } else {
        console.log(error(`Manque de ressources pour acheter ce type d'unité`));
      }
    });
  }

  createHeavySoldier() {
    return new Promise(resolve => {
      if (this.corn - HeavySoldier.cornCost >= 0 && this.gold -
        HeavySoldier.goldCost >= 0) {
        this.corn_ -= HeavySoldier.cornCost;
        this.gold_ -= HeavySoldier.goldCost;
        setTimeout(() => {
          this.unitList_.push(new HeavySoldier());
          this.unitList_[this.unitList_.length - 1].bioDeath();
          resolve();
        }, 15 * Number(process.env.TIME_FACTOR));
      } else {
        console.log(error(`Manque de ressources pour acheter ce type d'unité`));
      }
    });
  }

  sellGold(nbGold) {
    this.corn_ += nbGold * 0.7;
    this.gold_ -= nbGold;
  }

  sellCorn(nbCorn) {
    this.gold_ += nbCorn * 0.7;
    this.corn_ -= nbCorn;
  }

  doTradeWith(otherPolis, cornSended, goldSended) {
    return new Promise(resolve => {
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
        console.log(error(`Pas assez de ressource pour faire ce commerce`));
      }
    });
  }

  setDefenseTroop(nbLightSoldier, nbHeavySoldier, nbRider) {
    return new Promise(resolve => {
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
        resolve();
      } else {
        console.log(error('Pas assez de troupe pour envoyer cette attaque'));
      }
    });
  }

  attackOtherPolis(otherPolis) {
    return new Promise(resolve => {
      const travelDuration = Math.floor(this.position_.getDistance(
        otherPolis.position) * 2);
      // On considere que les unités qui ne se defendent pas vont se battre.
      const teamAttacking = this.unitList_.filter(
        unit => !unit.isDefensing() && !unit.isDead());
      const teamAttackingValue = {
        HP: teamAttacking.reduce((a, b) => a.HP + b.HP),
        attackSpeed: teamAttacking.reduce(
          (a, b) => a.attackSpeed + b.attackSpeed),
        attackValue: teamAttacking.reduce(
          (a, b) => a.attackValue + b.attackValue)
      };
      const teamDefending = otherPolis.unitList.filter(
        unit => !unit.isDefensing() && !unit.isDead());
      const teamDefendingValue = {
        HP: teamDefending.reduce((a, b) => a.HP + b.HP),
        attackSpeed: teamDefending.reduce(
          (a, b) => a.attackSpeed + b.attackSpeed),
        attackValue: teamDefending.reduce(
          (a, b) => a.attackValue + b.attackValue)
      };
      let aggressorAdvantage = teamAttackingValue.HP -
        (teamDefendingValue.attackValue * teamDefendingValue.attackSpeed);
      if (aggressorAdvantage < 0) {
        aggressorAdvantage = 0;
      }
      let defenderAdvantage = teamDefendingValue.HP -
        (teamAttackingValue.attackValue * teamAttackingValue.attackSpeed);
      if (defenderAdvantage < 0) {
        defenderAdvantage = (1 / Infinity);
      }

      const coefficientBattle = aggressorAdvantage / defenderAdvantage;
      setTimeout(() => {
        if (Math.random() < 0.5 * coefficientBattle) {
          // Tu gagnes le combat

          teamDefending.forEach(unit => {
            if (!unit.isWounded()) {
              if (Math.random() < 0.5) {
                unit.wounded = true;
              }
            }
          });
          this.corn_ += otherPolis.corn * 0.7;
          this.gold_ += otherPolis.gold * 0.7;
          otherPolis.corn -= otherPolis.corn * 0.7;
          otherPolis.gold -= otherPolis.gold * 0.7;
          resolve();
        } else {
          // Tu le perds
          teamAttacking.forEach(unit => {
            if (unit.isWounded() === false) {
              if (Math.random() < 0.75) {
                unit.wounded = true;
              } else {
                unit.dead = true;
              }
            } else if (Math.random() < 0.75) {
              unit.dead = true;
            } else {
              unit.wounded = true;
            }
          });
          otherPolis.corn += this.corn_ * 0.7;
          otherPolis.gold += this.gold_ * 0.7;
          this.corn_ -= this.corn_ * 0.7;
          this.gold_ -= this.gold_ * 0.7;
          resolve();
        }
      }, travelDuration * Number(process.env.TIME_FACTOR));
    });
  }

  get corn() {
    return this.corn_;
  }

  get gold() {
    return this.gold_;
  }

  set corn(value) {
    this.corn_ = value;
  }

  set gold(value) {
    this.gold_ = value;
  }

  get position() {
    return this.position_;
  }

  get name() {
    return this.name_;
  }

  get unitList() {
    return this.unitList_;
  }

  toString() {
    let text = 'Cité: ' + this.name + ', Divitinté$: ' +
      this.polisDivinity_.name + ', (' + this.position_.x + ', ' +
      this.position_.y + ')\n === GOLD: ' + this.gold_ + ', CORN: ' +
      this.corn_ + ' ===';

    text += `\nUnités de la cité : `;
    this.unitList.forEach(unit => {
      if (!unit.isDead()) {
        text += unit.toString() + '\n';
      }
    });
    return text;
  }
}

module.exports = {Polis};
