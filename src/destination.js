class Destination {
  constructor(destination) {
    this.id = destination.id;
    this.dailyLodgingCost = destination.estimatedLodgingCostPerDay;
    this.flightCostPerPerson = destination.estimatedFlightCostPerPerson;
    this.image = destination.image;
    this.alt = destination.alt;
  }
}

export default Destination