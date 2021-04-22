import Traveler from "./traveler"

class TravelerRepository {
  constructor(travelerData, trips) {
    this.travelers = travelerData.map(traveler => new Traveler(traveler, trips));
  }

  findUsersByName(name) {
    return this.travelers.filter(traveler => traveler.name.includes(name));
  }
}

export default TravelerRepository