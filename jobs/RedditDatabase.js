var request = require('request');
var RedditPF = require('../models/Reddit/PopularFunny.js');
var RedditNews = require('../models/Reddit/News.js');
var Reddit = require('../models/Reddit/RedditAll.js');
var User = require("../models/user");
var Profile = require("../models/profile");

// Funny/Entertainment subreddits
var urlsPop = [
  "https://www.reddit.com/r/ProgrammerHumor/.json", 
  "https://www.reddit.com/r/softwaregore/.json"];

// News and information subreddits
var urlsNews = [
  "https://www.reddit.com/r/technology/.json",
  "https://www.reddit.com/r/Futurology/.json"];

// Allow this function to be called from outside the file
exports.pop = function () {

  // Inform server that updating/retrieving reddit data in progress
  console.log('\x1b[32m%s\x1b[0m', 'INFO: Updating Reddit popular results');

  // Delete old data
  RedditPF.remove({}, function(err,removed) {});

  // Loop through all funny/entertainment subreddits
  for(var i = 0; i < urlsPop.length; i++) {
    var posts = [];
    var completed_requests = 0;

    // Request url in json format
    request({
      url: urlsPop[i],
      json: true
    }, function (error, response, body) { // Callback to manage code
      if (!error && response.statusCode === 200) {
        // Get the json data needed to get subreddit data
        var jsonData = body.data.children;

        // Increment completed requests to manage how many
        completed_requests++;

        // set counter to be used to stop loop when enough useful data is found
        // This counter is used to find the useful reddit dat aand ignore useless data such as stickied posts
        var counter = 0;

        // Loop through all reddit data
        for(var i = 0; i < jsonData.length; i++) {

          // Current loop iteration
          var obj = jsonData[i].data;

          // Temparary thumbnail used to make sure a thumbnail exsists
          var thumbnailTemp;

          // Temp pic used to ensure a full image is present
          var picTemp;

          // Checks if post is not a stickied post (Posts that contain data not relevant such as community announcements)
          if(obj.stickied == false) {
            if(obj.thumbnail == "" || obj.thumbnail == "self"){
              // image used as the thumbnail
              thumbnailTemp = "http://localhost:3000/api/assets/images/funnyPost.png";
              // Image used as the content image
              // If image is empty no image is displayed
              picTemp = "";
            }else{
              // Sets thumbnail as reddits thumbnail for the post
              thumbnailTemp = obj.thumbnail;
              // Sets full image as the reddit image
              picTemp = obj.url;
            }

            // Checks if url is an image or not
            if(obj.url.indexOf(".png") > -1 || obj.url.indexOf(".jpg") > -1){
              picTemp = obj.url; // Set image to the url
            }else{
              picTemp = ""; // Sets image to nothing 
            }

            // Add data to post json object
            posts.push({
              id: obj.id,
              title: obj.title,
              url: obj.url,
              pic: picTemp,
              thumbnail: thumbnailTemp,
              selftext: obj.selftext,
              subreddit: obj.subreddit,
              score: obj.score
            });

            // Increate useful data counter
            counter++;
          }

          // Stop when 10 useful posts have been found
          if(counter == 10) {
              break;
          }
        }
      }

      // When all GET request to the reddit api have completed this code section will run
      if(completed_requests == urlsPop.length){

        // Sory reddit posts by their score from high to low which will get the most relevent post
        posts.sort(function (a, b) {return b.score - a.score;});

        // Loop through sorted posts
        for(var i = 0; i < posts.length; i++) {

          // Set instance of RedditPF schema which interacts with the RedditPF mongo collection
          var newRedditPostPF = new RedditPF({
            _id: posts[i].id,
            title: posts[i].title,
            url: posts[i].url,
            pic: posts[i].pic,
            thumbnail: posts[i].thumbnail,
            selftext: posts[i].selftext,
            subreddit: posts[i].subreddit,
        });

        // Save new data to mongoDB
        newRedditPostPF.save(function (err) {if (err) {}});

        // Set instance of Reddit schema which interacts with the RedditPF mongo collection
        var newRedditPost = new Reddit({
          _id: posts[i].id,
          title: posts[i].title,
          url: posts[i].url,
          pic: posts[i].pic,
          thumbnail: posts[i].thumbnail,
          selftext: posts[i].selftext,
          subreddit: posts[i].subreddit
        });
          
        // Save new data to mongoDB
        newRedditPost.save(function (err) {if (err) {}});
        }
      }
    })
  }
};

// Allow this function to be called from outside the file
exports.news = function () {
  
  // Inform server that updating/retrieving reddit data in progress
  console.log('\x1b[32m%s\x1b[0m', 'INFO: Updating Reddit News results');

  // Delete old data
  RedditNews.remove({}, function(err,removed) {});

  // Inform server that updating/retrieving reddit data in progress
  for(var i = 0; i < urlsNews.length; i++) {
    var posts = [];
    var completed_requests = 0;

    // Request url in json format
    request({
      url: urlsNews[i],
      json: true
    }, function (error, response, body) { // Callback to manage code
      if (!error && response.statusCode === 200) {
        // Get the json data needed to get subreddit data
        var jsonData = body.data.children;

        // Increment completed requests to manage how many
        completed_requests++;

        // set counter to be used to stop loop when enough useful data is found
        // This counter is used to find the useful reddit dat aand ignore useless data such as stickied posts
        var counter = 0;

        // Loop through all reddit data
        for(var i = 0; i < jsonData.length; i++) {

          // Current loop iteration
          var obj = jsonData[i].data;

          // Temparary thumbnail used to make sure a thumbnail exsists
          var thumbnailTemp;

          // Temp pic used to ensure a full image is present
          var picTemp;

          // Checks if post is not a stickied post (Posts that contain data not relevant such as community announcements)
          if(obj.stickied == false) {
            if(obj.thumbnail == "" || obj.thumbnail == "self"){
              // image used as the thumbnail
              thumbnailTemp = "http://localhost:3000/api/assets/images/techNews.jpg";
              // Image used as the content image
              // If image is empty no image is displayed
              picTemp = "";
            }else{
              // Sets thumbnail as reddits thumbnail for the post
              thumbnailTemp = obj.thumbnail;
              // Sets full image as the reddit image
              picTemp = obj.url;
            }

            // Checks if url is an image or not
            if(obj.url.indexOf(".png") > -1 || obj.url.indexOf(".jpg") > -1){
              picTemp = obj.url; // Set image to the url
            }else{
              picTemp = ""; // Sets image to nothing 
            }

            // Add data to post json object
            posts.push({
              id: obj.id,
              title: obj.title,
              url: obj.url,
              pic: picTemp,
              thumbnail: thumbnailTemp,
              selftext: obj.selftext,
              subreddit: obj.subreddit,
              score: obj.score
            });
  
            // Increate useful data counter
            counter++;
          }

          // Stop when 10 useful posts have been found
          if(counter == 10) {
              break;
          }
        }
      }

      // When all GET request to the reddit api have completed this code section will run
      if(completed_requests == urlsNews.length){

        // Sory reddit posts by their score from high to low which will get the most relevent post
        posts.sort(function (a, b) {return b.score - a.score;});

        // Loop through sorted posts
        for(var i = 0; i < posts.length; i++) {
          var newRedditPostNews = new RedditNews({
            _id: posts[i].id,
            title: posts[i].title,
            url: posts[i].url,
            pic: posts[i].pic,
            thumbnail: posts[i].thumbnail,
            selftext: posts[i].selftext,
            subreddit: posts[i].subreddit,
          });

          // Save new data to mongoDB
          newRedditPostNews.save(function (err) {if (err) {}});

          // Set instance of Reddit schema which interacts with the Reddit mongo collection
          var newRedditPost = new Reddit({
            _id: posts[i].id,
            title: posts[i].title,
            url: posts[i].url,
            pic: posts[i].pic,
            thumbnail: posts[i].thumbnail,
            selftext: posts[i].selftext,
            subreddit: posts[i].subreddit
          });
          
        // Save new data to mongoDB
        newRedditPost.save(function (err) {if (err) {}});
        }
      }
    })
  }
};

// Allow this function to be called from outside the file
exports.createUsers = function () {

  // Create a user for the programming humour subreddit
  var programmerHumor = new User ({
    username : "ProgrammerHumor",
    email: "programmerHumor@Techbook.ie",
    first_name: "Programmer",
    surname: "Humor",
    bio: "Where progrogrammers come to laugh.",
    image: "programmingHumor.png",
    password: "Test"
  });

  // Save the programmerHumor user
  programmerHumor.save(function (err) {});

  // Create a user for the softwareGore humour subreddit
  var softwareGore = new User({
    username : "softwaregore",
    email: "softwareGore@Techbook.ie",
    first_name: "Software",
    surname: "Gore",
    bio: "Where progrogrammers come to feel beter about their work.",
    image: "softwaregore.png",
    password: "Test",
  });

  // Save the softwareGore user
  softwareGore.save(function (err) {});

  // Create a user for the technology humour subreddit
  var technology = new User({
    username : "technology",
    email: "technology@Techbook.ie",
    first_name: "Technology",
    surname: "News",
    bio: "Where you can come to find the best of recent technology news!",
    image: "technology.png",
    password: "Test",
  });

  // Save the softwareGore user
  technology.save(function (err) {});

  // Create a user for the Futurology humour subreddit
  var Futurology = new User({
    username : "Futurology",
    email: "Futurology@Techbook.ie",
    first_name: "Futurology",
    surname: "News",
    bio: "Where you can come to think of what might be.",
    image: "Futurology.jpg",
    password: "Test",
  });

  // Save the softwareGore user
  Futurology.save(function (err) {});
}