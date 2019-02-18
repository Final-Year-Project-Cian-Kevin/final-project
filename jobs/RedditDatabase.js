var request = require('request');
var RedditPH = require('../models/Reddit/Programming-Humor.js');
var Reddit = require('../models/Reddit/RedditAll.js');

// Subreddit URL
var urlPH = "https://www.reddit.com/r/ProgrammerHumor/.json"

exports.ph = function () {
    request({
        url: urlPH,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonData = body.data.children;

            // Delete old data
            RedditPH.remove({}, function(err,removed) {});

            var counter = 0;
            for(var i = 0; i < jsonData.length; i++) {
                var obj = jsonData[i];

                if(obj.data.stickied == false) {

                    var thumbnailTemp;

                    if(obj.data.thumbnail == "" || obj.data.thumbnail == "self"){
                        thumbnailTemp = "http://localhost:3000/api/assets/images/default.png";
                    }else{
                        thumbnailTemp = obj.data.thumbnail;
                    }

                    var newRedditPostPH = new RedditPH({
                        _id: obj.data.id,
                        title: obj.data.title,
                        url: obj.data.url,
                        thumbnail: thumbnailTemp,
                        selftext: obj.data.selftext,
                        subreddit: obj.data.subreddit
                    });
    
                    // Save new data to mongoDB
                    newRedditPostPH.save(function (err) {if (err) {}});
    
                    var newRedditPost = new Reddit({
                        _id: obj.data.id,
                        title: obj.data.title,
                        url: obj.data.url,
                        thumbnail: obj.data.thumbnail,
                        selftext: obj.data.selftext,
                        subreddit: obj.data.subreddit
                    });
                      
                    // Save new data to mongoDB
                    newRedditPost.save(function (err) {if (err) {}});

                    counter++;
                }

                if(counter == 10) {
                    break;
                }
            }
        }
    })
    console.log('\x1b[32m%s\x1b[0m', 'INFO: Updating Reddit API results');
};