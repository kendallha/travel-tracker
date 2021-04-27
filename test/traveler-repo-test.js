import chai from 'chai';
const expect = chai.expect;

import tripData from '../data/trip-test-data';
import TripRepository from '../src/trip-repo';
import Traveler from '../src/traveler';
import TravelerRepository from '../src/traveler-repo';
import destinationData from '../data/destination-test-data';
import DestinationRepo from '../src/destination-repo';
import travelerData from '../data/traveler-test-data';

describe('TravelerRepository', function() {
  let tripInfo;
  let trips;
  let travelerInfo = travelerData;
  let destinationInfo;
  let destinations;
  let travelers;

  beforeEach(function() {
    tripInfo = tripData;
    destinationInfo = destinationData;
    travelerInfo = travelerData.travelers;
    destinations = new DestinationRepo(destinationInfo.destinations);
    trips = new TripRepository(tripInfo.trips, destinations.destinations);
    travelers = new TravelerRepository(travelerInfo, trips);
  });

  it('should be a function', function() {
    expect(TravelerRepository).to.be.a('function');
  });

  it('should contain an array of Travelers', function() {
    expect(travelers.travelers[0]).to.be.an.instanceOf(Traveler);
    expect(travelers.travelers.length).to.equal(6)
  });

  it('should be able to find a traveler by name', function() {
    expect(travelers.findUsersByName("Tiffy")).to.deep.equal([{
      "id": 5,
      "name": "Tiffy Grout",
      "travelerType": "thrill-seeker",
      "trips": []
    }])
  });





})