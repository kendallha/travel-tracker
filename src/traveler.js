import dayjs from 'dayjs'
dayjs().format()

class Traveler {
  constructor(traveler, trips) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.trips = trips.getAllTripsByUser(this.id);
  }

  getTotalCostThisYear(date) {
    const tripsThisYear =  this.trips.filter(trip => dayjs(trip.date).isSame(dayjs(date), 'year'));
    return Math.round(tripsThisYear.reduce((acc, trip) => acc + trip.getTripCost(),0));
  }
  }


export default Traveler;