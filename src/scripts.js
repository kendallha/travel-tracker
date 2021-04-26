import './css/styles.scss';
import domUpdates from './dom-updates';
import Traveler from './traveler';
import DestinationRepository from './destination-repo';
import TripRepository from './trip-repo';
import datepicker from 'js-datepicker';
import dayjs from 'dayjs';
import Destination from './destination';
import Trip from './trip';
dayjs().format();

//GLOBAL VARS
let date = dayjs("12/11/2019").format('MM/DD/YYYY');
let tripStartDate;
let tripEndDate;
let traveler;
let trips;
let destinations;
let userIdInput;;

//QUERY SELECTOR VARS
let loginPage = document.querySelector("#logInPage");
let loginButton = document.querySelector("#loginButton");
let dateDisplay = document.querySelector("#date");
let username = document.querySelector("#username");
let loginSection = document.querySelector("#loginSection");
let password = document.querySelector("#password");
let userPage = document.querySelector("#userPage");
let greeting = document.querySelector("#greeting");
let bookingButton = document.querySelector("#bookingButton");
let bookingFormSection = document.querySelector("#bookingForm");
let bookingForm = document.querySelector("#form");
let exitButton = document.querySelector("#exitButton");
let pendingTripsList = document.querySelector("#pendingTrips");
let pastTripsList = document.querySelector("#pastTrips");
let currentTripsList = document.querySelector("#currentTrips");
let upcomingTripsList = document.querySelector("#upcomingTrips");
let tripCostTotal = document.querySelector("#tripCostTotal");
let destinationDropdown = document.querySelector("#destination");
let startDateInput = document.querySelector("#startDate");
let endDateInput = document.querySelector("#endDate");
let numberOfTravelersInput = document.querySelector("#numTravelers");
let requestTripButton = document.querySelector("#submitButton");
let estimatedTripCost = document.querySelector("#price");
let requestQuoteButton = document.querySelector("#requestQuote");
let overview = document.querySelector("#overview");

//EVENT LISTENERS
loginButton.addEventListener("click", getUserFromLogin);

bookingButton.addEventListener("click", () => {
  domUpdates.showBookingForm(bookingFormSection, estimatedTripCost);
});
exitButton.addEventListener("click", () => {
  domUpdates.showBookingForm(bookingFormSection, estimatedTripCost);
});
requestTripButton.addEventListener("click", () => {
  submitTripForApproval(createNewTripFromBookingForm(traveler, destinations, trips));
});
requestQuoteButton.addEventListener("click", () => {
  getTripPriceQuote(createNewTripFromBookingForm(traveler, destinations, trips));
})

//NETWORK REQUESTS
function fetchAPIData() {
  const travelerPromise = fetch(`http://localhost:3001/api/v1/travelers/${userIdInput}`)
    .then(response => checkForError(response))
    .then(data => data)
  
  const tripsPromise = fetch('http://localhost:3001/api/v1/trips')
    .then(response => checkForError(response))
    .then(data => data)
  
  const destinationsPromise = fetch('http://localhost:3001/api/v1/destinations')
    .then(response => checkForError(response))
    .then(data => data)

  Promise.all([travelerPromise, tripsPromise, destinationsPromise])
    .then(data => console.log(data))
    .then(data => prepareDOM(data))
    .catch(error => domUpdates.displayGetError(overview, error))
}

function requestNewBooking(newTrip) {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify({
      id: newTrip.id,
      userID: newTrip.userID,
      destinationID: newTrip.destination.id,
      travelers: newTrip.travelers,
      date: newTrip.date,
      duration: newTrip.duration,
      status: newTrip.status,
      suggestedActivities: newTrip.suggestedActivities
    }),
    headers: {
      "Content-Type": "application/json"
      }  
  })
    .then(response => checkForError(response))
    .then(data => updatePendingTrips(newTrip))
    .then(data => domUpdates.resetBookingForm(bookingForm))
    .then(data => domUpdates.displayBookingConfirmation(estimatedTripCost))
    .catch(error => domUpdates.displayPostError(estimatedTripCost));
}; 

function checkForError(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Something went wrong. Please try again.');
  }
};

//DATEPICKER HANDLING
const dateSplitter = date => {
  let splitDate = date.split("/");
  let joinDate = splitDate.join(",");
  return joinDate;
};

const startDateSelection = datepicker(startDateInput, {
  id: 1,
  minDate: new Date(dateSplitter(date)),
  startDate: new Date(dateSplitter(date)),
  onSelect: (instance, dateSelected) => {
    tripStartDate = dayjs(dateSelected);
  }
});

const endDateSelection = datepicker(endDateInput, {
  id: 1,
  minDate: new Date(dateSplitter(date)),
  onSelect: (instance, dateSelected) => {
    tripEndDate = dayjs(dateSelected);
    getTripDuration();
  }
});

//FUNCTIONS

function getUserFromLogin(e) {
  e.preventDefault();
  userIdInput = parseInt(username.value.replace(/\D/g,''));
  if (password.value === "travel2020" && userIdInput) {
    fetchAPIData();
    domUpdates.showUserView(loginPage, userPage);
  } else {
    domUpdates.displayPasswordError(loginSection)
  }
}

function prepareDOM([travelerData, tripData, destinationData]) {
  destinations = new DestinationRepository(destinationData.destinations);
  trips = new TripRepository(tripData.trips, destinations.destinations);
  populateDOM(travelerData);
}

function getNewTraveler(travelerInfo, tripRepository) {
  traveler = new Traveler(travelerInfo, tripRepository);
  const firstName = traveler.name.split(" ")[0];
  domUpdates.greetTraveler(firstName, greeting);
}

function populateDOM(travelerData) {
  domUpdates.displayDate(date, dateDisplay);
  //if statement using login
  getUserView(travelerData);
  // else statement with alternative agent page view
}

function getUserView(travelerData) {
  getNewTraveler(travelerData, trips);
  retrieveTrips();
  getTripSpending();
  populateDestinationOptions();
}

function retrieveTrips() {
  retrievePendingTrips();
  retrievePastTrips();
  retrieveCurrentTrips();
  retrieveUpcomingTrips();
}

function retrievePendingTrips() {
  const pendingTrips = trips.getPendingTripsByUser(traveler.id);
  showTrips(pendingTrips, pendingTripsList);
}

function retrievePastTrips() {
  const pastTrips = trips.getPastTripsByUser(traveler.id, date);
  showTrips(pastTrips, pastTripsList);
}

function retrieveCurrentTrips() {
  const currentTrips = trips.getCurrentTripsByUser(traveler.id, date);
  showTrips(currentTrips, currentTripsList);
}

function retrieveUpcomingTrips() {
  const upcomingTrips = trips.getUpcomingTripsByUser(traveler.id, date);
  showTrips(upcomingTrips, upcomingTripsList);
}

function showTrips(selectedTrips, element) {
  domUpdates.clearTrips(element);
  selectedTrips.forEach(trip => domUpdates.displayTrips(trip, element));
}

function getTripSpending() {
  const spending = traveler.getTotalCostThisYear(date);
  domUpdates.displayCostThisYear(spending, tripCostTotal);
}

function populateDestinationOptions() {
  const alphabeticalDestinations = destinations.destinations.sort((a,b) => {
    let destinationA = a.destination.toLowerCase();
    let destinationB = b.destination.toLowerCase();
    if (destinationA < destinationB) {
      return -1;
    }
    if (destinationA > destinationB) {
      return 1;
    }
    return 0;
  });
  alphabeticalDestinations.forEach(destination => domUpdates.addDestinationOption(destination, destinationDropdown))
} 

function getTripDuration() {
  return tripEndDate.diff(tripStartDate, "days", true);
}

function createNewTripFromBookingForm(traveler, destinations, trips) {
  const newTripInput = {
    id: trips.trips.length + 1,
    userID: traveler.id,
    destinationID: parseInt(destinationDropdown.value),
    travelers: numberOfTravelersInput.value,
    date: tripStartDate.format("YYYY/MM/DD"),
    duration: getTripDuration(),
    status: "pending",
    suggestedActivities: []
    }
  return new Trip(newTripInput, destinations.destinations);
}

function submitTripForApproval(newTrip) {
  requestNewBooking(newTrip);
  event.preventDefault();
}

function updatePendingTrips(newTrip) {
  trips.trips.push(newTrip);
  retrievePendingTrips();
}

function getTripPriceQuote(newTrip) {
  const quote = newTrip.getTripCost();
  domUpdates.displayEstimatedPrice(estimatedTripCost, quote);
  event.preventDefault();
}



