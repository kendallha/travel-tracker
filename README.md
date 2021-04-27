# Travel Tracker

## Overview

This is the final project for MOD 2 of Turing School of Software & Design. For this project, I built a travel agency site, focusing on the following skills:
- Test-driven development
- Designing an effective class structure
- Using network requests to `GET` and `POST` data to an API
- Handling `fetch` errors
- Utilizing Webpack
- Writing DRY Javascript that utilizes the single responsibility principle
- Separating DOM-related JS from 'business-logic'
- Using SCSS to write clean and modular CSS
- Creating a fully responsive layout across mobile and desktop devices
- Using ARIA and semantic HTML to improve site accessibility

### [Github Repo](https://github.com/kendallha/travel-tracker)
### [My Github](https://github.com/kendallha)

## Setup Instructions

1. Clone into the repo
2. Run `npm install`
3. Run `npm start` to connect to `localhost:8080`
4. Follow the directions in [this repo](https://github.com/turingschool-examples/travel-tracker-api) to connect to the local server
5. Navigate to `http://localhost:8080/` to view the site
6. Log in using the username `traveler<integer between 1 and 50>` and password `travel2020`. The integer in the username specifies which user's data to fetch.

## App Features

- See total user has spent on trips *this year*
- See all past, current, upcoming, and pending (awaiting agent approval) trips
- Request a new trip: 
  - Select a destination, date range, and number of travelers
  - Get a quote for the trip price (including a 10% fee for the travel agent)
  - Submit the trip for agent approval (the trip now will appear in the 'Pending Trips' list)

## Demonstration:

# Login Page
![GIF showing log in](https://media.giphy.com/media/8rCJhHE4KTiwG41iVa/giphy.gif) 

# Booking a New Trip
![GIF showing booking a trip](https://media.giphy.com/media/Phd6lZ76FIiDpZ5zkG/giphy.gif)

# User Overview Page Responsive Layout
<img src="https://user-images.githubusercontent.com/25498241/116295319-ce46d100-a74d-11eb-8a9b-ff0841b3ada4.png" width="500">
<img src="https://user-images.githubusercontent.com/25498241/116295341-d4d54880-a74d-11eb-8926-0dee16f06ce6.png" width="350">
<img src="https://user-images.githubusercontent.com/25498241/116295357-d999fc80-a74d-11eb-933e-034c3db75529.png" height="300">


# Technologies Used

- Chai and Mocha for testing
- Webpack
- NPM
- Vanilla Javascript
- HTML
- SCSS
- Node servers

# Future Additions
- Agent view with ability to search for users and approve booking requests

