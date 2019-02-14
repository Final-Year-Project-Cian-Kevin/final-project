var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comments = require('../models/Comment.js');

/* 
Get method for getting all user comments
Link - /comment/all
*/
router.get('/all', function(req, res){
    Comments.find(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
      });
});

/* 
Post method to save a comment a user submits on a post
Link - /comment/post
*/
router.post('/post', function (req, res, next) {
    Comments.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

module.exports = router;