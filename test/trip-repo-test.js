import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/trip';
import TripRepository from '../src/trip-repo';
import tripData from '../data/trip-test-data';
import DestinationRepo from '../src/destination-repo';
import destinationData from '../data/destination-test-data';

describe('TripRepository', function() {
  let trips;
  let tripInfo;
  let date;
  let destinationInfo;
  let destinations;

  beforeEach(function() {
    tripInfo = tripData;
    destinationInfo = destinationData;
    destinations = new DestinationRepo(destinationInfo.destinations);
    trips = new TripRepository(tripInfo.trips, destinations.destinations);
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
    expect(trips.getAllPendingTrips()).to.deep.equal([ {
      "id": 2,
      "userID": 35,
      "destination": {
        "id": 2,
        "destination": "Stockholm, Sweden",
        "dailyLodgingCost": 100,
        "flightCostPerPerson": 780,
        "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "city with boats on the water during the day time"
      },
      "travelers": 5,
      "date": "2021/10/04",
      "duration": 18,
      "status": "pending",
      "suggestedActivities": []
    }, 
    {
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
    }])
  });

  it('should be able to get a user\'s upcoming trips', function() {
    expect(trips.getUpcomingTripsByUser(3, date)).to.deep.equal([{
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
    },
    {
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

  it('should be able to get a user\'s past trips', function() {
    expect(trips.getPastTripsByUser(43, date)).to.deep.equal([{
      "id": 4,
      "userID": 43,
      "destination": {
        "id": 3,
        "destination": "Sydney, Austrailia",
        "dailyLodgingCost": 130,
        "flightCostPerPerson": 950,
        "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "opera house and city buildings on the water with boats"
      },
      "travelers": 2,
      "date": "2020/02/25",
      "duration": 10,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 5,
      "userID": 43,
      "destination": {
        "id": 4,
        "destination": "Cartagena, Colombia",
        "dailyLodgingCost": 65,
        "flightCostPerPerson": 350,
        "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        "alt": "boats at a dock during the day time"
      },
      "travelers": 3,
      "date": "2020/04/30",
      "duration": 18,
      "status": "approved",
      "suggestedActivities": []
    }])

    expect(trips.getPastTripsByUser(3, "2020/01/01")).to.deep.equal([])
  });

  it('should be able to get a user\'s current trips', function() {
    expect(trips.getCurrentTripsByUser(44, "2019/09/20")).to.deep.equal([{
      "id": 1,
      "userID": 44,
      "destination": {
        "id": 3,
        "destination": "Sydney, Austrailia",
        "dailyLodgingCost": 130,
        "flightCostPerPerson": 950,
        "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "opera house and city buildings on the water with boats"
      },
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": ["snorkeling", "hot springs", "museums"]
    }])

    expect(trips.getCurrentTripsByUser(35, "2019/09/20")).to.deep.equal([])
  });

  it('should be able to get all current trips', function() {
    expect(trips.getAllCurrentTrips("2019/09/20")).to.deep.equal([{
      "id": 1,
      "userID": 44,
      "destination": {
        "id": 3,
        "destination": "Sydney, Austrailia",
        "dailyLodgingCost": 130,
        "flightCostPerPerson": 950,
        "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "opera house and city buildings on the water with boats"
      },
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": ["snorkeling", "hot springs", "museums"]
    }])

    expect(trips.getAllCurrentTrips("2017/09/20")).to.deep.equal([])
  });

  it('should be able to get all trips for a given user', function() {
    expect(trips.getAllTripsByUser(44)).to.deep.equal([{
      "id": 1,
      "userID": 44,
      "destination": {
        "id": 3,
        "destination": "Sydney, Austrailia",
        "dailyLodgingCost": 130,
        "flightCostPerPerson": 950,
        "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "opera house and city buildings on the water with boats"
      },
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": ["snorkeling", "hot springs", "museums"]
    }])
  });

  it('should be able to get the trip revenue from the current year', function() {
    expect(trips.getYearlyRevenue(date)).to.equal(733);
  })

})