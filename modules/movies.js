'use strict';

//connect to cache
let cache = require('./movieCache.js');
const axios = require('axios');

//export getMovie to main server.
module.exports = getMovie;

//function to export
function getMovie(name) {
  const key = 'name-' + name;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${name}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseMovie(response.data));
  }

  return cache[key].data;
}

//build a movie object.
function parseMovie(movieData) {
  try {
    const movieSummaries = movieData.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

//movie constructor
class Movie {
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
