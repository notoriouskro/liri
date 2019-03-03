require("dotenv").config();
var fs = require("fs")
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var axios = require("axios");
// var moment = require('moment');
var cmd = process.argv[2];
var cmdData = process.argv[3];
cmdData = cmdData.split(' ').join('+');
// var textFile = "log.txt";

if (cmd === 'concert-this') {
  console.log(cmd);
  var artist = process.argv[3];
  artist = artist.split(' ').join('')

  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&tracker_count=5";
 

  axios.get(queryUrl).then(function (response) {
    
     console.log(response.data)
    // console.log("----------------------");
    // console.log("Venue: " + event.venue.name);
    // console.log("Location: " + event.venue.city);
    // console.log("Date: " + response.tracks.items[0].preview_url);
  });

} else if (cmd === 'spotify-this-song') {

  var spotify = new spotify(keys.spotify);
  spotify
    .search({ type: 'track', query: cmdData })
    .then(function (response) {
      console.log("----------------------");
      console.log("Artist: " + response.tracks.items[0].artists[0].name);
      console.log("Track Name: " + response.tracks.items[0].name);
      console.log("URL: " + response.tracks.items[0].preview_url);
      console.log("Album: " + response.tracks.items[0].album.name);
    })
    .catch(function (err) {
      console.log(err);
    })

} else if (cmd === 'movie-this') {
 

  //  * Title of the movie.
  //  * Year the movie came out.
  //  * IMDB Rating of the movie.
  //  * Rotten Tomatoes Rating of the movie.
  //  * Country where the movie was produced.
  //  * Language of the movie.
  //  * Plot of the movie.
  //  * Actors in the movie.

 
  var movie = process.argv.slice(3).join('+');

  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  axios
    .get(queryUrl).then(function (response) {
      // If the axios was successful...
      // Then log the body from the site!
      console.log("----------------------");
      console.log("Movie title: " + response.data.Title);
      console.log("Movie released in: " + response.data.Year);
      console.log("IMDB: " + response.data.imdbRating);
      console.log("Rotten Tomatoes: " + response.data.rtRating);
      console.log("Country: " + response.data.Country);
      console.log("Language(s): " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code$ npm install axios
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);

    });


} else if (cmd === 'do-what-it-says') {
  console.log('do-what-it-says');
};






