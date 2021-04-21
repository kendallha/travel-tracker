import chai from 'chai';
const expect = chai.expect;

import Destination from '../src/destination';
import destinationData from './destination-test-data';

describe('Destination', function() {
  let destinations;
  let destination;

  beforeEach(function() {
    destinations = destinationData;
    destination = new Destination(destinations.destinations[0]);
  })

  it('should be a function', function() {
    expect(Destination).to.be.a('function');
  });

  it('should be an instance of Destination', function() {
    expect(destination).to.be.an.instanceOf(Destination);
  })

  it('should contain an id', function() {
    expect(destination.id).to.equal(1);
  })

  it('should contain the daily lodging cost', function() {
    expect(destination.dailyLodgingCost).to.equal(70);
  })

  it('should contain the flight cost per person', function() {
    expect(destination.flightCostPerPerson).to.equal(400);
  })

  it('should have an image of the destination', function() {
    expect(destination.image).to.equal('https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80');
  })

  it('should have an image alt text', function() {
    expect(destination.alt).to.equal('overview of city buildings with a clear sky');
  })
});