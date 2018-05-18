const chai = require('chai');
const {add} = require('../app/add');

chai.should();

describe('add.js', () => {
  describe('#add()', () => {
    it('should return 4 when passing 2 and 2', () => {
      add(2, 2).should.be.equal(4);
    });

    it('should return 5 when passing 3 and 2', () => {
      add(3, 2).should.be.equal(5);
    });

    it('should return 5 when passing 2 and 3', () => {
      add(2, 3).should.be.equal(5);
    });

    it('should work with string as well', () => {
      add('2', '3').should.be.equal(5);
      add('3', '2').should.be.equal(5);
      add('2', '2').should.be.equal(4);
    });

    it('should work when indefinite number of inputs', () => {
      add(2, 3, 4, 5, 6).should.be.equal(20);
    });
  });
});
