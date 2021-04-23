import './css/styles.scss';
import './index.js';
import domUpdates from './dom-updates';
import Traveler from './traveler';
import DestinationRepository from './destination-repo';
import TripRepository from './trip-repo';

let date = dayjs("12/11/2020");
let traveler;
let trips;
let destinations;
let userIdInput = 1;

window.addEventListener("load", fetchAPIdata);

function fetchAPIData() {
  console.log("somethins happenin");
  const travelerPromise = fetch(`http://localhost:3001/api/v1/travelers/${userIdInput}`)
    .then(response => response.json())
    .then(data => data)
  
  const tripsPromise = fetch('http://localhost:3001/api/v1/trips')
    .then(console.log(response.ok))
    .then(response => response.json())
    .then(data => data)
  
  const destinationsPromise = fetch('http://localhost:3001/api/v1/destinations')
    .then(console.log(response.ok))
    .then(response => response.json())
    .then(data => data)

  Promise.all([travelerPromise, tripsPromise, destinationsPromise])
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

