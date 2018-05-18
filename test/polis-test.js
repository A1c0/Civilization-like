require('dotenv')
  .config({path: '/home/alexandre/WebstormProjects/TP-Batman/data.env'});

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Polis} = require('../app/polis');
const {Divinity} = require('../app/divinity');
const {Rider, LightSoldier, HeavySoldier} = require('../app/units');

chai.use(chaiAsPromised);
chai.should();

describe('polis.js', () => {
  describe('Polis', () => {
    let g;

    before(() => {
      g = new Polis('testPolis',
        new Divinity('testDivinity', process.env.TIME_FACTOR));
      // G.init();;
    });

    beforeEach(() => {
      g.corn_ = 1000;
      g.gold_ = 1000;
      g.unitList_ = [];
    });

    after(() => {
    });

    it('should create a light soldier', async () => {
      await g.createLightSoldier();
      g.corn.should.be.equal(1000 - LightSoldier.cornCost);
      g.gold.should.be.equal(1000 - LightSoldier.goldCost);
      g.unitList_.length.should.be.equal(1);
    });

    it('should create a heavy soldier', async () => {
      await g.createHeavySoldier();
      g.corn.should.be.equal(1000 - HeavySoldier.cornCost);
      g.gold.should.be.equal(1000 - HeavySoldier.goldCost);
      g.unitList_.length.should.be.equal(1);
    });

    it('should create a rider', async () => {
      await g.createRider();
      g.corn.should.be.equal(1000 - Rider.cornCost);
      g.gold.should.be.equal(1000 - Rider.goldCost);
      g.unitList_.length.should.be.equal(1);
    });
  });
});

