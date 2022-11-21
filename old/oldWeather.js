// const axios = require('axios');

// // CLASSES
// class Forecast {
//   constructor(cityObject, idx) {
//     this.description = `Low of ${cityObject.low_temp} High of ${cityObject.high_temp} and ${cityObject.weather.description}.`;
//     this.date = cityObject.valid_date;
//     this.key = idx;
//   }
// }

// async function getForecast(req, res, next) {
//   try {
//     //get val from request
//     let lat = req.query.lat;
//     let lon = req.query.lon;
//     //set pram for the quarry
//     let params = {
//       key: process.env.WEATHER_API_KEY,
//       lat: lat,
//       lon: lon
//     };
//     let baseURL = 'http://api.weatherbit.io/v2.0/forecast/daily/';
//     let results = await axios.get(baseURL, { params });
//     //pack info
//     let weatherArray = results.data.data.map(pic => new Forecast(pic));
//     // send info
//     res.send(weatherArray);
//   } catch (error) {
//     Promise.resolve().then(() => {
//       throw new Error(error.message);
//     }).catch(next);
//   }
// }

// module.exports = getForecast;
