let [nope, moar_nope, method, movie] = process.argv


require("dotenv").config();

//var spotify = new spotify(keys.spotify);

let keys = require('./keys.js');

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


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
    var request = require('request');
    let fs = require("fs")
    function release(movie) {
      if (movie== undefined){
        movie="Mr Nobody"
      }
      request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy&r=json", function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body); // Print the HTML for the Google homepage.
        object = JSON.parse(body)
        console.log("*******************************************************************")
        console.log("* Title: "+object.Title)
        console.log("* Released: "+object.Released)
        console.log("* Imdb Rating: "+object.imdbRating)
        // if (object.Ratings[1].Source==="Rotten Tomatoes"){
        //   console.log("* Rotten Tomatoes Rating: "+ object.Ratings[1].value)
        // }
        console.log("* Country: "+object.Country)
        console.log("* Language: "+object.Language)
        console.log("* Plot: "+object.Plot)
        console.log("* Actors: "+object.Actors)
        console.log("*******************************************************************")

    })
      }
    
      switch (method) {
        case "my-tweets":
          tweetfunc()
          break;

        case "spotify-this-song":
          //release()
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