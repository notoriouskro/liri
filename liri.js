require("dotenv").config();
var fs = require("fs")
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var cmd = process.argv[2];
var cmdData = process.argv[3];



fs.appendFile("log.txt", cmdData, function (err) {

  // If an error was experienced we will log it.
  if (err) {
    console.log(err);
  }

  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
  else {
    console.log("Content Added!");
  }
})

if (cmd === 'concert-this') {


  var artist = process.argv.slice(3).join('+');
  if (!artist) {
    artist = "justin timberlake"
  }
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&tracker_count=5";

  // for(var i = 0; i < 5; i++){
  axios.get(queryUrl).then(function (response) {
    console.log("----------------------"),
      console.log("Artist: " + artist.split('+').join(' ')),
      console.log("Venue: " + response.data[0].venue.name),
      console.log("Location: " + response.data[0].venue.city),
      console.log("Date: " + moment(response.data[0].datetime).format('L')),
      console.log("----------------------"),
      console.log("Artist: " + artist.split('+').join(' ')),
      console.log("Venue: " + response.data[1].venue.name),
      console.log("Location: " + response.data[1].venue.city),
      console.log("Date: " + moment(response.data[1].datetime).format('L')),
      console.log("----------------------"),
      console.log("Artist: " + artist.split('+').join(' ')),
      console.log("Venue: " + response.data[2].venue.name),
      console.log("Location: " + response.data[2].venue.city),
      console.log("Date: " + moment(response.data[2].datetime).format('L'))
  });

  // };

} else if (cmd === 'spotify-this-song') {
  if (!cmdData) {
    var spotify = new spotify(keys.spotify);
    spotify
      .search({ type: 'track', query: "The Sign" })
      .then(function (response) {
        console.log("----------------------");
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Track Name: " + response.tracks.items[0].name);
        console.log("URL: " + response.tracks.items[0].preview_url);
        console.log("Album: " + response.tracks.items[0].album.name);
      })
  } else {
    cmdData = cmdData.split(' ').join('+');
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
  }

} else if (cmd === 'movie-this') {

  var movie = process.argv.slice(3).join('+');
  if (!movie) {
    movie = "Mr. Nobody"
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  axios
    .get(queryUrl).then(function (response) {

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
  // fs.readFile("random.txt", "utf8", function (error, data) {
  //   if (error) {
  //     return console.log(error);
  //   } else {

  //     // The goal here was to pull the data using FS and push it into an array. The first item would be the command ('spotify-this-song') and the second part would be the song to search.
  //     var txtSearch = data.split(',');
  //     console.log("DATA: " + txtSearch);
  //     var cmd = txtSearch[0];
  //     var cmdData = txtSearch[1];
  //     cmdData = cmdData.split(' ').join('+');
  //     var spotify = new spotify(keys.spotify);
  //     spotify
  //       .search({ type: 'track', query: cmdData })
  //       .then(function (response) {
  //         console.log("----------------------");
  //         console.log("Artist: " + response.tracks.items[0].artists[0].name);
  //         console.log("Track Name: " + response.tracks.items[0].name);
  //         console.log("URL: " + response.tracks.items[0].preview_url);
  //         console.log("Album: " + response.tracks.items[0].album.name);
  //       })
  //       .catch(function (err) {
  //         console.log(err);
  //       })
  //   }

// });
}
