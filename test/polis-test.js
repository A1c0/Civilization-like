require('dotenv')
  .config({path: '/home/alexandre/WebstormProjects/TP-Batman/data.env'});

const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Polis} = require('../app/polis');
const {Divinity} = require('../app/divinity');
const {Rider, LightSoldier, HeavySoldier} = require('../app/units');
const {Position} = require('../app/position');

chai.use(chaiAsPromised);
chai.should();

describe('polis.js', () => {
  describe('Polis', () => {
    let stub;
    let p1;
    let p2;
    context('when whant to create a unit', () => {
      before(() => {
        p1 = new Polis('Allebahst',
          new Divinity('divinity', process.env.TIME_FACTOR),
          new Position(2, 1));
      });

      beforeEach(() => {
        p1.corn_ = 1000;
        p1.gold_ = 1000;
        p1.unitList_ = [];
      });

      it('should create a light soldier', async () => {
        await p1.createLightSoldier();
        p1.corn.should.be.equal(1000 - LightSoldier.cornCost);
        p1.gold.should.be.equal(1000 - LightSoldier.goldCost);
        p1.unitList_.length.should.be.equal(1);
      });

      it('should create a heavy soldier', async () => {
        await p1.createHeavySoldier();
        p1.corn.should.be.equal(1000 - HeavySoldier.cornCost);
        p1.gold.should.be.equal(1000 - HeavySoldier.goldCost);
        p1.unitList_.length.should.be.equal(1);
      });

      it('should create a rider', async () => {
        await p1.createRider();
        p1.corn.should.be.equal(1000 - Rider.cornCost);
        p1.gold.should.be.equal(1000 - Rider.goldCost);
        p1.unitList_.length.should.be.equal(1);
      });
    });
    context('when failed a trade', () => {
      before(() => {
        p1 = new Polis('Allebahst',
          new Divinity('divinity', process.env.TIME_FACTOR),
          new Position(2, 1));
        p2 = new Polis('Alicante',
          new Divinity('divinity', process.env.TIME_FACTOR),
          new Position(7, 4));
        stub = sinon.stub(Math, 'random').returns(0.04);
      });
      after(() => {
        stub.restore();
      });

      it('should lose corn and gold', async () => {
        await p1.doCommerceWith(p2, 200, 30);
        p1.corn_.should.be.equal(1000 - 200);
        p1.gold_.should.be.equal(1000 - 30);
      });
    });

    context('when succeed a trade', () => {
      before(() => {
        p1 = new Polis('Allebahst',
          new Divinity('divinity', process.env.TIME_FACTOR),
          new Position(2, 1));
        p2 = new Polis('Alicante',
          new Divinity('divinity', process.env.TIME_FACTOR),
          new Position(7, 4));
        stub = sinon.stub(Math, 'random').returns(0.4);
      });

      after(() => {
        stub.restore();
      });

      it('should earn corn and gold', async () => {
        await p1.doCommerceWith(p2, 200, 30);
        p1.corn_.should.be.equal(1000 + 220);
        p1.gold_.should.be.equal(1000 + 33);
      });
    });
  });
});

