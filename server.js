'use strict';

// REQUIRE
const {response} = require('express');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
let data = require('./data/weather.json');
const PORT = process.env.PORT || 3002;
//Use
const app = express();
app.use(cors());

// ROUTES
// this is where we will write handlers for our endpoints
app.get('/', (request, response) => {
  response.send('Hello, from our server');
});

app.get('/weather', (request, response, next) => {
  try {
    // let searchQuery = request.query.name;
    let latQuarry = Math.floor(request.query.lat);
    let lonQuarry = Math.floor(request.query.lon);
    let selectedCity = data.find(weather => Math.floor(weather.lat) === latQuarry && Math.floor(weather.lon) === lonQuarry);
    let cityCleanedUp = selectedCity.data.map((elem, idx) => {return (new Forecast(selectedCity, idx));});
    response.send(cityCleanedUp);
  } catch (error) {
    next(error);
  }
});

// '*' wild card
// this will run for any route not defined above
app.get('*', (request, response) => {
  response.send('That route does not exist');
});

// ERRORS
// handle any errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// CLASSES
class Forecast {
  constructor(cityObject, idx) {
    this.description = `Low of ${cityObject.data[idx].low_temp} High of ${cityObject.data[idx].high_temp} and ${cityObject.data[idx].weather.description}.`;
    this.date = cityObject.data[idx].datetime;
  }
}

// LISTEN
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
