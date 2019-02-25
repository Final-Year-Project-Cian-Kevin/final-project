var request = require('request');
var RedditPF = require('../models/Reddit/PopularFunny.js');
var Reddit = require('../models/Reddit/RedditAll.js');

var urls = [
  "https://www.reddit.com/r/ProgrammerHumor/.json", 
  "https://www.reddit.com/r/softwaregore/.json"];

exports.pop = function () {

  // Delete old data
  RedditPF.remove({}, function(err,removed) {});

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

          posts.push({
            id: obj.id,
            title: obj.title,
            url: obj.url,
            thumbnail: thumbnailTemp,
            selftext: obj.selftext,
            subreddit: obj.subreddit,
            score: obj.score
          });

          counter++;

          if(counter == 10) {
              break;
          }
        }
      }

      if(completed_requests == urls.length){
        console.log('\x1b[32m%s\x1b[0m', 'INFO: Updating Reddit API results');

        posts.sort(function (a, b) {return b.score - a.score;});

        for(var i = 0; i < posts.length; i++) {
          var newRedditPostPH = new RedditPF({
            _id: posts[i].id,
            title: posts[i].title,
            url: posts[i].url,
            thumbnail: posts[i].thumbnail,
            selftext: posts[i].selftext,
            subreddit: posts[i].subreddit,
        });

        // Save new data to mongoDB
        newRedditPostPH.save(function (err) {if (err) {}});

        var newRedditPost = new Reddit({
          _id: posts[i].id,
          title: posts[i].title,
          url: posts[i].url,
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