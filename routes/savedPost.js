var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SavedPosts = require('../models/SavedPosts.js');

/* 
Get method for getting all saved posts
Link - /savedposts/all
*/
router.get('/all', function(req, res){
  SavedPosts.find(function (err, posts) {
      if (err) return next(err);
      res.json(posts);
  });
});

router.get('/post/:id', function (req, res, next) {
  SavedPosts.find({post_id: req.params.id}, function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

router.get('/profile/:id', function (req, res, next) {
  SavedPosts.find({profile_id: req.params.id}, function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

router.post('/post', function (req, res, next) {
  SavedPosts.create(req.body, function (err, post) {
    console.log(post);
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;