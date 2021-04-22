import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/trip';
import tripData from '../data/trip-test-data';
import TripRepository from '../src/trip-repo';
import Traveler from '../src/traveler';
import destinationData from '../data/destination-test-data';
import DestinationRepo from '../src/destination-repo';
import travelerData from '../data/traveler-test-data';

describe('Traveler', function() {
  let tripInfo;
  let traveler;
  let trips;
  let travelerInfo = travelerData;
  let destinationInfo;
  let destinations;
  // let userID;

  beforeEach(function() {
    tripInfo = tripData;
    destinationInfo = destinationData;
    travelerInfo = travelerData.travelers[2];
    // userID = 3;
    destinations = new DestinationRepo(destinationInfo.destinations);
    trips = new TripRepository(tripInfo.trips, destinations.destinations);
    traveler = new Traveler(travelerInfo, trips);
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
    expect(traveler.trips).to.deep.equal([{
      "id": 3,
      "userID": 3,
      "destination": {
        "id": 3,
        "destination": "Sydney, Austrailia",
        "dailyLodgingCost": 130,
        "flightCostPerPerson": 950,
        "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "opera house and city buildings on the water with boats"
        },
      "travelers": 4,
      "date": "2020/05/22",
      "duration": 17,
      "status": "pending",
      "suggestedActivities": []
    }, {
      "id": 3,
      "userID": 3,
      "destination": {
        "id": 4,
        "destination": "Cartagena, Colombia",
        "dailyLodgingCost": 65,
        "flightCostPerPerson": 350,
        "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        "alt": "boats at a dock during the day time"
        },
      "travelers": 4,
      "date": "2021/10/22",
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    }, {
      "id": 3,
      "userID": 3,
      "destination": {
        "id": 2,
        "destination": "Stockholm, Sweden",
        "dailyLodgingCost": 100,
        "flightCostPerPerson": 780,
        "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "city with boats on the water during the day time"
        },
      "travelers": 4,
      "date": "2021/05/22",
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    }])
  });

  it('should be able to calculate the traveler\s trip costs this year', function() {
    expect(traveler.getTotalCostThisYear()).to.equal(8058);
  });

})