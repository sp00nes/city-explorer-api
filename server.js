'use strict';

// REQUIRE
const {response} = require('express');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const PORT = process.env.PORT || 3002;
//Use
const app = express();
app.use(cors());

// ROUTES
// this is where we will write handlers for our endpoints
app.get('/', (request, response) => {
  response.send('Hello, from our server');
});

app.get('/weather', async (request, response, next) => {
  try {
    //Stores the requests from api call into a var /weather?request=""&request=""
    let latQuarry = request.query.lat;
    let lonQuarry = request.query.lon;
    //makes a var that stores urls for api calls.
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${latQuarry}&lon=${lonQuarry}&lang=en&units=I&days=12`;
    //api calls
    let selectedCity = await axios.get(url);
    //makes new constructor to format info as needed.
    let cityCleanedUp = selectedCity.data.data.map((elem, idx) => {return (new Forecast(elem, idx));});
    //sends new data to the caller.
    response.send({cityCleanedUp});
  } catch (error) {
    next(error);
  }
});

app.get('/movie', async (request, response, next) => {
  try {
    let nameQuarry = request.query.name;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${nameQuarry}`;
    let selectedMovie = await axios.get(movieUrl);
    let movieCleanedUp = selectedMovie.data.results.map((elem, idx) => {return (new Movies(elem, idx));});
    response.send({movieCleanedUp});
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
    this.description = `Low of ${cityObject.low_temp} High of ${cityObject.high_temp} and ${cityObject.weather.description}.`;
    this.date = cityObject.valid_date;
    this.key = idx;
  }
}

class Movies {
  constructor(movieObj, idx) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.average_votes = movieObj.vote_average;
    this.total_votes = movieObj.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
    this.popularity = movieObj.popularity;
    this.released_on = movieObj.release_date;
    this.key = idx;
  }
}

// LISTEN
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
