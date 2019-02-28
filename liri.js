require("dotenv").config();

var axios = require("axios");
var cmd = process.argv[2];
var cmdData = process.argv[3];
cmdData = cmdData.splice(' ').join('+');

if(cmd === 'concert-this'){
    console.log('concert-this');

}else if(cmd === 'spotify-this-song'){

    console.log('spotify-this-song');
    

}else if(cmd === 'movie-this'){

    console.log('movie-this');
  //  * Title of the movie.
  //  * Year the movie came out.
  //  * IMDB Rating of the movie.
  //  * Rotten Tomatoes Rating of the movie.
  //  * Country where the movie was produced.
  //  * Language of the movie.
  //  * Plot of the movie.
  //  * Actors in the movie.

  axios
  .get("http://www.omdbapi.com/?t=" + cmdData + "&y=&plot=short&apikey=trilogy")
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    console.log(response.data);
  })
  .catch(function(error) {
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


}else if(cmd === 'do-what-it-says'){
    console.log('do-what-it-says');
};

var Spotify = require('node-spotify-api');
 
spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });




