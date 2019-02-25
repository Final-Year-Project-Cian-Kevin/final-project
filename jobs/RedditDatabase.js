var request = require('request');
var RedditPH = require('../models/Reddit/PopularFunny.js');
var Reddit = require('../models/Reddit/RedditAll.js');
var fs = require('fs');

// Subreddit URL
var urlPH = "https://www.reddit.com/r/ProgrammerHumor/.json"
var urlSG = "https://www.reddit.com/r/softwaregore/.json"

var urls = [urlPH, urlSG];

exports.pop = function () {

  // Delete old data
  RedditPH.remove({}, function(err,removed) {});

  for(var i = 0; i < urls.length; i++) {
    var posts = [];
    var completed_requests = 0;

    request({
      url: urls[i],
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = body.data.children;

        completed_requests++;

        var counter = 0;
        for(var i = 0; i < jsonData.length; i++) {
          var obj = jsonData[i].data;
          var thumbnailTemp;

          if(obj.stickied == false) {
            if(obj.thumbnail == "" || obj.thumbnail == "self"){
                thumbnailTemp = "http://localhost:3000/api/assets/images/default.png";
            }else{
                thumbnailTemp = obj.thumbnail;
            }
          }

          console.log(obj.id);

          counter++;

          if(counter == 10) {
              break;
          }
        }
      }

      if(completed_requests == urls.length){
        console.log("Test" + completed_requests + "\n\n");
      }

    })
  }






















    console.log('\x1b[32m%s\x1b[0m', 'INFO: Updating Reddit API results');
};