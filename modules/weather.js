'use strict';

//connect to cache
let cache = require('./weatherCache.js');
const axios = require('axios');

//export get weather to main server.
module.exports = getWeather;

//function to export
function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + longitude;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseWeather(response.data));
  }

  return cache[key].data;
}

//build a weather object.
function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Forecast(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

//weather constructor
class Forecast {
  constructor(day, idx) {
    this.description = `Low of ${day.low_temp} High of ${day.high_temp} and ${day.weather.description}.`;
    this.date = day.valid_date;
    this.key = idx;
  }
}
