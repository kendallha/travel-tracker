let domUpdates = {

  displayPasswordError(element) {
    element.innerHTML += `<p>Your username or password is incorrect. Please try again.<p>`
  },

  showUserView(loginPage, userPage) {
    loginPage.classList.add("hidden");
    userPage.classList.remove("hidden");
  },

  greetTraveler(travelerName, element) {
    element.innerText = `Welcome, ${travelerName}`;
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
    let expandedAttribute = element.getAttribute("aria-expanded");
    if (expandedAttribute === 'true') {
      element.setAttribute("aria-expanded", false);
   } else {
      element.setAttribute("aria-expanded", true);
   }
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
    element.innerText = `Thanks for booking. Your trip has been sent to an agent for approval.`
  },

  displayPostError(element) {
    element.innerText = `Oh no, something went wrong. Please try again.`
  },

  displayGetError(element, error) {
    console.log(error);
    element.innerHTML += `<h3 class="error">Oh no, something went wrong. Please check your internet connection and reload the page.</h3>`
  }
}

export default domUpdates;