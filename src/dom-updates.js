let domUpdates = {

  greetTraveler(travelerName, element) {
    element.innerText = `Welcome, ${travelerName}`;
  },

  showUserName(travelerFullName, element) {
    element.innerText = travelerFullName;
  },
  
  displayDate(date, element) {
    element.innerHTML = date;
  },

  clearTrips(element) {
    element.innerHTML = ``;
  },

  displayTrips(trip, element) {
    element.innerHTML += `
    <li>${trip.destination.destination}: ${trip.date}
    `
  }
}

export default domUpdates;