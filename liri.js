let [nope, moar_nope, method, movie] = process.argv

const util = require('util');
require("dotenv").config();
let keys = require('./keys.js');

//  var spotify = require('spotify');
// var spotify = new spotify(keys.spotify);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

//TWEET FUNCTION
function tweetfunc() {

  client.get('statuses/user_timeline', function (error, tweets, response) {
    if (error) throw error;

    if (JSON.stringify(tweets.length) < 20)
      var nbr = JSON.stringify(tweets.length)
    else {
      nbr = 20
    }
    for (i = 0; i < nbr; i++) {
      console.log("tweet" + (i + 1) + " " + (JSON.stringify(tweets[i].created_at).replace('"', '')) + (JSON.stringify(tweets[i].text)));
    }
  })
}

//SPOTIFY FUNCTION
function searchSong(movie) {

  var Spotify = require('node-spotify-api');

  var spotify = new Spotify({
    id: "37749190f861459c9677467f8faba1eb",
    secret: "579e51cdc92349bb9e3cc4d722aa2504"
  });
  if (movie === undefined) {
    movie = "The Sign"
  }
  spotify.search({ type: 'track', query: movie }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("* Artist(s): " + data.tracks.items[0].artists[0].name)
    console.log("* The song's name: " + data.tracks.items[0].name)
    console.log("* A preview link of the song from Spotify: " + data.tracks.items[0].preview_url)
    console.log("* The album that the song is from: " + data.tracks.items[0].album.name)
  });
}

var request = require('request');
let fs = require("fs")

//OMDB FUNCTION
function release(movie) {
  if (movie == undefined) {
    movie = "Mr Nobody"
  }
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy&r=json", function (error, response, body) {
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
    object = JSON.parse(body)
    console.log("*******************************************************************")
    console.log("* Title: " + object.Title)
    console.log("* Released: " + object.Released)
    console.log("* Imdb Rating: " + object.imdbRating)
    // if (object.Ratings[1].Source==="Rotten Tomatoes"){
    //   console.log("* Rotten Tomatoes Rating: "+ object.Ratings[1].value)
    // }
    console.log("* Country: " + object.Country)
    console.log("* Language: " + object.Language)
    console.log("* Plot: " + object.Plot)
    console.log("* Actors: " + object.Actors)
    console.log("*******************************************************************")

  })
}

switch (method) {
  case "my-tweets":
    tweetfunc()
    break;

  case "spotify-this-song":
    searchSong(movie)
    break;

  case "movie-this":
    release(movie)
    break;

  case "do-what-it-says":
    tweetfunc()
    break;

  default:
    break;
}