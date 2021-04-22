class Trip {
  constructor(trip, destinations) {
    this.id = trip.id;
    this.user = trip.userID;
    this.destination = destinations.find(destination => destination.id === trip.destinationID)
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
    this.suggestedActivities = trip.suggestedActivities;
  }

  getTripCost() {
    const totalCost = (this.destination.dailyLodgingCost * this.duration) +   (this.destination.flightCostPerPerson * this.travelers);
    return totalCost + (totalCost * .1);
  }
}

export default Trip