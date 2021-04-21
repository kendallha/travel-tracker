import Destination from "./destination"

class DestinationRepo {
  constructor(destinationData) {
    this.destinations = destinationData.map(destination => new Destination(destination));
  }
}

export default DestinationRepo