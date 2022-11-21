'use strict';

//requires
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//bring in functions from other places
const weather = require('./modules/weather.js');
const movie = require('./modules/movies.js');
const app = express();
app.use(cors());

//server response routs
app.get('/weather', weatherHandler);
app.get('/movie', movieHandler);


//functions that get call when route it requested.
function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

function movieHandler(request, response) {
  const { name } = request.query;
  movie(name)
    .then(sum => response.send(sum))
    .catch((error) => {
      console.log(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

//listen
app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
