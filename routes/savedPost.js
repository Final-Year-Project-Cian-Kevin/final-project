var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SavedPosts = require('../models/SavedPosts.js');

/* 
Get method for getting all saved posts
Link - /savedpost/all
*/
router.get('/all', function(req, res){
  SavedPosts.find(function (err, posts) {
      if (err) return next(err);
      res.json(posts);
  });
});

router.get('/post/:id1/:id2', function (req, res, next) {
  SavedPosts.find({post_id: req.params.id1, profile_id: req.params.id2}, function (err, posts) {
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

router.delete('/delete/:id1/:id2', function (req, res, next) {
  SavedPosts.find({post_id: req.params.id1, profile_id: req.params.id2}, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  }).remove().exec();
});

module.exports = router;