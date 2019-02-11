var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');
var RedditPH = require('../models/Reddit/Programming-Humor.js');
var Reddit = require('../models/Reddit/RedditAll.js');
var cron = require('node-cron');

// Subreddit URL
var url = "https://www.reddit.com/r/ProgrammerHumor/top.json?limit=10"

cron.schedule('* * * * *', () => {
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonData = body.data.children;

            for(var i = 0; i < jsonData.length; i++) {
                var obj = jsonData[i];

                var newRedditPostPH = new RedditPH({
                    _id: obj.data.id,
                    title: obj.data.title,
                    url: obj.data.url,
                    thumbnail: obj.data.thumbnail,
                    subreddit: obj.data.subreddit
                  });

                // Delete old data
                newRedditPostPH.remove({})

                // Save new data to mongoDB
                newRedditPostPH.save(function (err) {if (err) {}});

                  var newRedditPost = new Reddit({
                    _id: obj.data.id,
                    title: obj.data.title,
                    url: obj.data.url,
                    thumbnail: obj.data.thumbnail,
                    subreddit: obj.data.subreddit
                  });
                  
                // Save new data to mongoDB
                newRedditPost.save(function (err) {if (err) {}});
            }
        }
    })
    console.log('\x1b[32m%s\x1b[0m', 'INFO: Updating Reddit API results');
});

/* 
Get method for ProgrammerHumor subreddit 
Link - /redditapi/PH
*/
router.get('/ph', function(req, res){
    Reddit.find(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
      });
});
module.exports = router;