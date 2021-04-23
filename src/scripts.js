import './css/styles.scss';
import domUpdates from './dom-updates';
import Traveler from './traveler';
import DestinationRepository from './destination-repo';
import TripRepository from './trip-repo';
import dayjs from 'dayjs';
dayjs().format();

let date = dayjs("12/11/2020");
let traveler;
let trips;
let destinations;
let userIdInput = 1;

let bookingButton = document.querySelector("#bookingButton");

window.addEventListener("load", fetchAPIData);
bookingButton.addEventListener("click", () => {
  console.log("click");
})

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
  console.log(destinations);
  trips = new TripRepository(tripData.trips, destinations.destinations);
  getNewTraveler(travelerData, trips);
}

function getNewTraveler(travelerInfo, tripRepository) {
  traveler = new Traveler(travelerInfo, tripRepository);
  //get first name, call DOM function to show it in banner
}

