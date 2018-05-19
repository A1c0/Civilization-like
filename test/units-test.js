require('dotenv')
  .config({path: '/home/alexandre/WebstormProjects/TP-Batman/data.env'});

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Rider, LightSoldier, HeavySoldier} = require('../app/units');

chai.use(chaiAsPromised);
chai.should();

describe('units.js', () => {
  describe('Rider', () => {
    it('should cost 300 corn and 20 gold', () => {
      Rider.cornCost.should.be.equal(300);
      Rider.goldCost.should.be.equal(20);
    });
  });
  describe('LightSoldier', () => {
    it('should cost 100 corn and 0 gold', () => {
      LightSoldier.cornCost.should.be.equal(100);
      LightSoldier.goldCost.should.be.equal(0);
    });
  });
  describe('HeavySoldier', () => {
    it('should cost 200 corn and 10 gold', () => {
      HeavySoldier.cornCost.should.be.equal(200);
      HeavySoldier.goldCost.should.be.equal(10);
    });
  });
});
