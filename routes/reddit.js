var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');
var RedditPH = require('../models/Reddit/Programming-Humor.js');
var Reddit = require('../models/Reddit/RedditAll.js');
var cron = require('node-cron');

// Subreddit URL
var urlPH = "https://www.reddit.com/r/ProgrammerHumor/.json"

cron.schedule('* * * * *', () => {
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
                    var newRedditPostPH = new RedditPH({
                        _id: obj.data.id,
                        title: obj.data.title,
                        url: obj.data.url,
                        thumbnail: obj.data.thumbnail,
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
                    i = 100;
                }
                
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
    RedditPH.find(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
      });
});

/* 
Get method for ProgrammerHumor subreddit 
Link - /redditapi/all
*/
router.get('/all', function(req, res){
    Reddit.find(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
      });
});

/* 
Get method for specific post using ID
Link - /redditapi/all/:id
*/
router.get('/all/:id', function (req, res, next) {
    Reddit.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
module.exports = router;