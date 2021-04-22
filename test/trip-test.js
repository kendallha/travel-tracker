import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/trip';
import tripData from '../data/trip-test-data';
import DestinationRepo from '../src/destination-repo';
import Destination from '../src/destination';
import destinationData from '../data/destination-test-data';

describe('Trip', function() {
  let trip;
  let tripInfo;
  let destinationInfo;
  let destinations;

  beforeEach(function() {
    tripInfo = tripData;
    destinationInfo = destinationData;
    destinations = new DestinationRepo(destinationInfo.destinations);
    trip = new Trip(tripInfo.trips[0], destinations.destinations);
  })

  it('should be a function', function() {
    expect(Trip).to.be.a('function');
  });

  it('should instantiate a Trip', function() {
    expect(trip).to.be.an.instanceOf(Trip);
  });

  it('should have an ID', function() {
    expect(trip.id).to.equal(1);
  });

  it('should contain the id of the user who booked it', function() {
    expect(trip.user).to.equal(44);
  });

  it('should contain an instantiated Destination', function() {
    expect(trip.destination).to.be.an.instanceOf(Destination);
  });

  it('should contain the number of travelers', function() {
    expect(trip.travelers).to.equal(1);
  });

  it('should have a start date', function() {
    expect(trip.date).to.equal('2019/09/16');
  });

  it('should have a duration in days', function() {
    expect(trip.duration).to.equal(8);
  });

  it('should have a current status', function() {
    expect(trip.status).to.equal("approved");
  });

  it('should have a list of suggested activities', function() {
    expect(trip.suggestedActivities).to.deep.equal(["snorkeling", "hot springs", "museums"]);
  });

  it('should be able to calculate the estimated cost of a trip', function() {
    expect(trip.getTripCost()).to.equal(2189)
  })

})
