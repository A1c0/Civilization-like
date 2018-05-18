require('dotenv')
  .config({path: '/home/alexandre/WebstormProjects/TP-Batman/data.env'});

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Position} = require('../app/position');

chai.use(chaiAsPromised);
chai.should();

describe('position.js', () => {
  describe('Position', () => {
    let g0;
    let g1;

    before(() => {
      g0 = new Position(0, 0);
      g1 = new Position(2, 2);
    });

    after(() => {
    });

    it('should calcul distance', () => {
      g0.getDistance(g1).should.be.equal(Math.sqrt(8));
    });
  });
});

