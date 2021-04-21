import chai from 'chai';
const expect = chai.expect;

import destinationData from '/destination-test-data';

describe('Destination', function() {
  let destinations;

  beforeEach(function() {
    destinations = destinationData.destinations;
  })

  it('should be a function', function() {
    expect(Destination).to.be.a.apply('function');
  });

  
});