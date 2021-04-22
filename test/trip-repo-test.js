import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/trip';
import TripRepository from '../src/trip-repo';
import tripData from '../data/trip-test-data';
import DestinationRepo from '../src/destination-repo';
import Destination from '../src/destination';
import destinationData from '../data/destination-test-data';

describe('Trip', function() {
  let trips;
  let tripInfo;
  let date;

  beforeEach(function() {
    tripInfo = tripData;
    destinationInfo = destinationData;
    trips = new TripRepository(tripInfo.trips);
    date = '2021/04/21'
  });

  it('should be a function', function() {
    expect(TripRepository).to.be.a('function');
  });

  it('should instantiate a TripRepository', function() {
    expect(trips).to.be.an.instanceOf(TripRepository);
  });

  it('should contain instances of Trips', function() {
    expect(trips.trips[0]).to.be.an.instanceOf(Trip);
  })

  it('should be able to provide a list of all pending trips', function() {
    expect(trips.getPendingTrips()).to.deep.equal([{
      "id": 2,
      "userID": 35,
      "destinationID": 25,
      "travelers": 5,
      "date": "2020/10/04",
      "duration": 18,
      "status": "pending",
      "suggestedActivities": []
    },{
      "id": 3,
      "userID": 3,
      "destinationID": 22,
      "travelers": 4,
      "date": "2020/05/22",
      "duration": 17,
      "status": "pending",
      "suggestedActivities": []
    }])
  });

  it('should be able to get a user\'s upcoming trips', function() {
    expect(trips.getUpcomingTripsByUser(3, date)).to.deep.equal([{
      "id": 3,
      "userID": 3,
      "destinationID": 22,
      "travelers": 4,
      "date": "2021/10/22",
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 3,
      "userID": 3,
      "destinationID": 22,
      "travelers": 4,
      "date": "2021/05/22",
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    }])
  });

  it('should be able to get a user\'s past trips', function() {
    expect(trips.getPastTripsByUser(43, date)).to.deep.equal([{
      "id": 4,
      "userID": 43,
      "destinationID": 14,
      "travelers": 2,
      "date": "2020/02/25",
      "duration": 10,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 5,
      "userID": 43,
      "destinationID": 29,
      "travelers": 3,
      "date": "2020/04/30",
      "duration": 18,
      "status": "approved",
      "suggestedActivities": []
    }])
  });

  it('should be able to get the trip revenue from the current year', function() {
    expect(trips.getYearlyRevenue(date)).to.equal(732.50);
  })

})