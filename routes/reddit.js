var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');
var Book = require('../models/Book.js');
var cron = require('node-cron');

cron.schedule('* * * * *', () => {
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonData = body.data.children;

            for(var i = 0; i < jsonData.length; i++) {
                var obj = jsonData[i];
            
                console.log(obj.data.id); // Post ID
                console.log(obj.data.title); // Title of post
                console.log(obj.data.url); // Image or website url
                console.log(obj.data.thumbnail); // Preview image of image or website
                console.log(obj.data.subreddit); // Subreddit source
            }
        }
    })
});

var url = "https://www.reddit.com/r/ProgrammerHumor/top.json"

/* 
Get method for ProgrammerHumor subreddit 
Link - /redditapi/PH
*/
router.get('/ph', function(req, res){

    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log(body) // Print the json response
            //console.log(body.data.children);
            res.json(body.data.children); // Send JSON data to user
        }
    })

});
module.exports = router;