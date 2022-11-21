// 'use strict';

// // REQUIRE
// // required from npm
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');

// // import the weather modules
// const getWeatherHandler = require('./modules/weather.js');
// const getMovie = require('./modules/movies.js');

// // instantiate express server by calling express
// const app = express();

// // USE
// app.use(cors());

// // define port and proof that env works
// const PORT = process.env.PORT || 3002;

// // ROUTES
// app.get('/', (req, res) => {
//   res.status(200).send('Hello there!');
// });

// // route for weather
// app.get('/weather', getWeatherHandler);
// app.get('/movie', getMovie);

// // everything else rout
// app.get('*', (req, res) => {
//   res.status(404).send('These are not the droids you are looking for...');
// });

// // ERRORS
// app.use((error, request, response, next) => {//eslint-disable-line
//   console.log(error.message);
//   response.status(500).send(error.message);
// });

// // LISTEN
// // need to listen to keep server running
// app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
