var express = require('express');
var router = express.Router();
var request = require('request');
var getJSON = require('get-json');

var url = "https://www.reddit.com/r/ProgrammerHumor/top.json"

/* 
Get method for ProgrammerHumor subreddit 
Link - /reddit/ph
*/
router.get('/ph', function(req, res){

    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log(body) // Print the json response
            res.send(body); // Send JSON data to user
        }
    })

});
module.exports = router;