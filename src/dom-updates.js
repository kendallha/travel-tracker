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
  },

  displayCostThisYear(amount, element) {
    element.innerText = `Trip Costs This Year: $ ${amount}`
  },

  showBookingForm(element, section) {
    element.classList.toggle("hidden");
    section.innerText = ``;
  },

  addDestinationOption(destination, element) {
    element.innerHTML += `<option class="destination-option" id=${destination.id} value=${destination.id}>${destination.destination}</option>`
  },

  resetBookingForm(element) {
    element.reset();
  },

  displayEstimatedPrice(element, quote) {
    element.innerHTML = `Estimated trip cost: $ ${quote}`;
  },

  displayBookingConfirmation(element) {
    element.innerHTML = `Thanks for booking. Your trip has been sent to an agent for approval.`
  }
}

export default domUpdates;