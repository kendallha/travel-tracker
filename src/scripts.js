import './css/styles.scss';
import domUpdates from './dom-updates';
import Traveler from './traveler';
import DestinationRepository from './destination-repo';
import TripRepository from './trip-repo';
import dayjs from 'dayjs';
dayjs().format();

let date = dayjs("12/11/2019").format('MM/DD/YYYY');
// let date = "2020/12/11";
let traveler;
let trips;
let destinations;
let userIdInput = 2;

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


window.addEventListener("load", fetchAPIData);
bookingButton.addEventListener("click", () => {
  domUpdates.showBookingForm(bookingForm);
});
exitButton.addEventListener("click", () => {
  domUpdates.showBookingForm(bookingForm);
});

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

