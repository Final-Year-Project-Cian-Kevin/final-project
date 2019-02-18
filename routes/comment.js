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
Get method for specific comments on a post using ID
Link - /comment/all/:id
*/
router.get('/post/:id', function (req, res, next) {
  Comments.find({post_id: req.params.id}, function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

/* 
Get method for specific comments made by a suer using user ID
Link - /comment/all/:id
*/
router.get('/profile/:id', function (req, res, next) {
  Comments.find({profile_id: req.params.id}, function (err, posts) {
    console.log(posts);
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
    console.log(post);
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;