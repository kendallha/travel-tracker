import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/trip';
import tripData from '../data/trip-test-data';
import TripRepository from '/../src/trip-repo';
import Traveler from '/../src/traveler';
import destinationData from '../data/destination-test-data';
import DestinationRepo from '../src/destination-repo';
import travelerData from '../data/trip-test-data';

describe('Trip', function() {
  let tripInfo;
  let traveler;
  let travelerInfo = travelerData;
  let destinationInfo;
  let destinations;
  let userID;

  beforeEach(function() {
    tripInfo = tripData;
    destinationInfo = destinationData;
    travelerInfo = travelerData;
    userID = 3;
    destinations = new DestinationRepo(destinationInfo.destinations);
    trips = new TripRepository(tripInfo.trips, destinations.destinations);
    traveler = new Traveler(userID);
  });

  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should instantiate a Traveler', function() {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it('should have an ID', function() {
    expect(traveler.id).to.equal(3);
  });

  it('should have a name', function() {
    expect(traveler.name).to.equal('Sibby Dawidowitsch');
  });

  it('should have a traveler type', function() {
    expect(traveler.travelerType).to.equal('shopper');
  });

  it('should contain a list of the traveler\'s trips', function() {
    expect(traveler.trips).to.deeply.equal([{
      "id": 3,
      "userID": 3,
      "destinationID": 3,
      "travelers": 4,
      "date": "2020/05/22",
      "duration": 17,
      "status": "pending",
      "suggestedActivities": []
    }, {
      "id": 3,
      "userID": 3,
      "destinationID": 4,
      "travelers": 4,
      "date": "2021/10/22",
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    }, {
      "id": 3,
      "userID": 3,
      "destinationID": 2,
      "travelers": 4,
      "date": "2021/05/22",
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    }])
  });

  it('should be able to calculate the traveler\s trip costs this year', function() {
    expect(traveler.getTotalCostThisYear()).to.equal(10813);
  });

})