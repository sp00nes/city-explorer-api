// const axios = require('axios');

// // CLASSES
// class Movie {
//   constructor(movieObj, idx) {
//     this.title = movieObj.title;
//     this.overview = movieObj.overview;
//     this.average_votes = movieObj.vote_average;
//     this.total_votes = movieObj.vote_count;
//     this.image_url = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
//     this.popularity = movieObj.popularity;
//     this.released_on = movieObj.release_date;
//     this.key = idx;
//   }
// }

// async function getMovie(req, res, next) {
//   try {
//     //get val from request
//     let searchQuarry = req.query.name;
//     //set pram for the quarry
//     let params = {
//       api_key: process.env.MOVIE_API_KEY,
//       query: searchQuarry,
//     };
//     let baseURL = 'https://api.themoviedb.org/3/search/movie/';
//     let results = await axios.get(baseURL, { params });
//     //pack info
//     let movieArray = results.data.results.map(movie => new Movie(movie));
//     // send info
//     res.send(movieArray);
//   } catch (error) {
//     Promise.resolve().then(() => {
//       throw new Error(error.message);
//     }).catch(next);
//   }
// }

// module.exports = getMovie;
