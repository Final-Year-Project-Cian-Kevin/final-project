/**
 * @swagger
 * definition:
 *   savedPosts:
 *     properties:
 *       post_id:
 *         type: string
 *       profile_id:
 *         type: string
 */

 // Imports used
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SavedPosts = require('../models/SavedPosts.js');

/* 
Get method for getting all saved posts
Link - api/savedpost/all
*/
/**
 * @swagger
 * /api/savedpost/all:
 *   get:
 *     tags:
 *       - savedPosts
 *     description: Returns all saved posts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of saved posts
 *         schema:
 *           $ref: '#/definitions/savedPosts'
 */
router.get('/all', function(req, res){
  SavedPosts.find(function (err, posts) {
      if (err) return next(err);
      res.json(posts);
  });
});

/* 
Get method for finding if a user has saved a specific post
Link - api/savedpost/post/{id1}/{id2}
*/
/**
 * @swagger
 * /api/savedpost/post/{id1}/{id2}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id1
 *         required: true
 *         schema:
 *           type: id
 *         description: Post id
 *       - in: path
 *         name: id2
 *         required: true
 *         schema:
 *           type: id
 *         description: Username
 *     tags:
 *       - savedPosts
 *     description: Returns if user is following a post
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A post if a user has saved it
 *         schema:
 *           $ref: '#/definitions/savedPosts'
 */
router.get('/post/:id1/:id2', function (req, res, next) {
  SavedPosts.find({post_id: req.params.id1, profile_id: req.params.id2}, function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

/* 
Get method for all saved posts by username
Link - api/savedpost/profile/{id}
*/
/**
 * @swagger
 * /api/savedpost/profile/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: id
 *         description: Get all saved posts by specific username
 *     tags:
 *       - savedPosts
 *     description: Returns saved post by user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array saved posts by a user
 *         schema:
 *           $ref: '#/definitions/savedPosts'
 */
router.get('/profile/:id', function (req, res, next) {
  SavedPosts.find({profile_id: req.params.id}, function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

/* 
Post method for all saved posts by username
Link - api/savedpost/post
*/
/**
 * @swagger
 * /api/savedpost/post:
 *   post:
 *     tags:
 *       - savedPosts
 *     description: Creates a new saved post
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: savedPost
 *         description: Saved post object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/savedPosts'
 *     responses:
 *       200:
 *         description: Successfully created a saved post
 */
router.post('/post', function (req, res, next) {
  SavedPosts.create(req.body, function (err, post) {
    console.log(post);
    if (err) return next(err);
    res.json(post);
  });
});

/* 
Delete method for deleting a specific post by using the post ID and username
Link - api/savedpost/delete/{id1}/{id2}
*/
/**
 * @swagger
 * /api/savedpost/delete/{id1}/{id2}:
 *   delete:
 *     tags:
 *       - savedPosts
 *     description: Deletes a single saved post
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id1
 *         description: Post ID
 *         in: path
 *         required: true
 *         type: string
 *       - name: id2
 *         description: user ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted saved post
 */
router.delete('/delete/:id1/:id2', function (req, res, next) {
  SavedPosts.find({post_id: req.params.id1, profile_id: req.params.id2}, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  }).remove().exec();
});

// export router as router
module.exports = router;