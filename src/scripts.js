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
let userIdInput = 2;

//QUERY SELECTOR VARS
let dateDisplay = document.querySelector("#date");
let username = document.querySelector("#username");
let greeting = document.querySelector("#greeting");
let bookingButton = document.querySelector("#bookingButton");
let bookingForm = document.querySelector("#bookingForm");
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

//EVENT LISTENERS
window.addEventListener("load", fetchAPIData);
bookingButton.addEventListener("click", () => {
  domUpdates.showBookingForm(bookingForm);
});
exitButton.addEventListener("click", () => {
  domUpdates.showBookingForm(bookingForm);
});
requestTripButton.addEventListener("click", () => {
  createNewTripFromBookingForm(traveler, destinations);
});

//NETWORK REQUESTS
function fetchAPIData() {
  const travelerPromise = fetch(`http://localhost:3001/api/v1/travelers/${userIdInput}`)
    .then(response => response.json())
    .then(data => data)
  
  const tripsPromise = fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
    .then(data => data)
  
  const destinationsPromise = fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json())
    .then(data => data)

  Promise.all([travelerPromise, tripsPromise, destinationsPromise])
    .then(data => prepareDOM(data))
    .catch(error => console.log(error))
}

// function requestNewBooking(newTrip) {
//   fetch("http://localhost:3001/api/v1/trips", {
//     method: "POST",
//     body: JSON.stringify({
//       id: newTrip.id,
//       userID: traveler.id,
//       destinationID: newTrip.destination.id,
//       travelers: numberTravelers,
//       date: tripStartDate.format("YYYY/MM/DD"),
//       duration: getTripDuration(),
//       status: "pending",
//       suggestedActivities: []
//     }),
//     headers: {
//       "Content-Type": "application/json"
//       }  
//   })
//     .then(response => response.json())
//     .then(data => updatePendingTrips())
//     .catch(error => console.log(error))
// }; 

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
function prepareDOM([travelerData, tripData, destinationData]) {
  destinations = new DestinationRepository(destinationData.destinations);
  trips = new TripRepository(tripData.trips, destinations.destinations);
  populateDOM(travelerData);
}

function getNewTraveler(travelerInfo, tripRepository) {
  traveler = new Traveler(travelerInfo, tripRepository);
  const firstName = traveler.name.split(" ")[0];
  domUpdates.greetTraveler(firstName, greeting);
  domUpdates.showUserName(traveler.name, username);
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

// function getBookingDetails() {
//   //save input as variables
//   //POST request passing variables as parameters
// }

function getTripDuration() {
  return tripEndDate.diff(tripStartDate, "days", true);
}

function createNewTripFromBookingForm(traveler, destinations) {
  const newTripInput = {
    id: Math.round(((Math.random()*100) + 200)),
    userID: traveler.id,
    destinationID: parseInt(destinationDropdown.value),
    travelers: numberOfTravelersInput.value,
    date: tripStartDate.format("YYYY/MM/DD"),
    duration: getTripDuration(),
    status: "pending",
    suggestedActivities: []
    }
  const newTripRequest = new Trip(newTripInput, destinations.destinations);
  console.log(newTripRequest);
}



