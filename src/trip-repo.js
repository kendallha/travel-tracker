import dayjs from "dayjs";
import Trip from "./trip";
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween)
dayjs().format();

class TripRepository {
  constructor(tripData, destinations) {
    this.trips = tripData.map(trip => new Trip(trip, destinations));
  }

  getAllPendingTrips() {
    return this.trips.filter(trip => trip.status === "pending");
  }

  getAllTripsByUser(userID) {
    return this.trips.filter(trip => trip.userID === userID);
  }

  getPendingTripsByUser(userID) {
    return this.trips.filter(trip => trip.status === "pending" && trip.userID === userID);
  }

  getUpcomingTripsByUser(userID, date) {
    return this.trips.filter(trip => (dayjs(date).isBefore(dayjs(trip.date)) && trip.userID === userID));
  }

  getCurrentTripsByUser(userID, date) {
    return this.trips.filter(trip => {
      const tripDate = dayjs(trip.date);
      const tripEndDate = tripDate.add(trip.duration, 'days');
      return dayjs(date).isBetween(tripDate, tripEndDate, 'day','[]') && trip.userID === userID;
    })
  }

  getAllCurrentTrips(date) {
    return this.trips.filter(trip => {
      const tripDate = dayjs(trip.date);
      const tripEndDate = tripDate.add(trip.duration, 'days');
      return dayjs(date).isBetween(tripDate, tripEndDate, 'day');
    })
  }

  getPastTripsByUser(userID, date) {
    return this.trips.filter(trip => {
      const tripDate = dayjs(trip.date);
      const tripEndDate = tripDate.add(trip.duration, 'days');
      return dayjs(date).isAfter(tripEndDate) && trip.userID === userID;
    })
  }

  getYearlyRevenue(date) {
    const tripsThisYear =  this.trips.filter(trip => dayjs(trip.date).isSame(dayjs(date), 'year') && trip.status === "approved");

    return Math.round(tripsThisYear.reduce((acc, trip) => acc + trip.getTripRevenue(),0));
  }

}

export default TripRepository