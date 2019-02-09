var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');
var Reddit = require('../models/Reddit.js');
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

            for(var i = 0; i < 10; i++) {
                var obj = jsonData[i];

                var newRedditPost = new Reddit({
                    _id: obj.data.id,
                    title: obj.data.title,
                    url: obj.data.url,
                    thumbnail: obj.data.thumbnail,
                    subreddit: obj.data.subreddit
                  });

                  // Catch errors
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
    Reddit.find(function (err, books) {
        if (err) return next(err);
        res.json(books);
      });
});
module.exports = router;