/**
 * @swagger
 * definition:
 *   comment:
 *     properties:
 *       post_id:
 *         type: string
 *       profile_id:
 *         type: string
 *       comment:
 *         type: string
 */

// Imports used
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comments = require('../models/Comment.js');

/* 
Get method for getting all user comments
Link - /comment/all
*/
/**
 * @swagger
 * /api/comment/all:
 *   get:
 *     tags:
 *       - comments
 *     description: Returns all comments
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of comments
 *         schema:
 *           $ref: '#/definitions/comment'
 */
router.get('/all', function (req, res) {
  Comments.find(function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

/* 
Get method for specific comments on a post using ID
Link - /comment/post/:id
*/
/**
 * @swagger
 * /api/comment/post/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *           type: id
 *         description: The post ID
 *     tags:
 *       - comments
 *     description: Returns all comments from that post ID
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of comments
 *         schema:
 *           $ref: '#/definitions/comment'
 */
router.get('/post/:id', function (req, res, next) {
  Comments.find({ post_id: req.params.id }, function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

/* 
Get method for specific comments made by a user using user ID
Link - /comment/profile/:id
*/
/**
 * @swagger
 * /api/comment/profile/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *           type: id
 *         description: The users username
 *     tags:
 *       - comments
 *     description: Returns all comments from that profile username
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of comments
 *         schema:
 *           $ref: '#/definitions/comment'
 */
router.get('/profile/:id', function (req, res, next) {
  Comments.find({ profile_id: req.params.id }, function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

/* 
Get method for most recent comments made by the user
Link - /comment/profiledate/:id
*/
/**
 * @swagger
 * /api/comment/profiledate/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *           type: id
 *         description: The users username
 *     tags:
 *       - comments
 *     description: Returns all comments from that profile username and sorts by date submitted
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of comments
 *         schema:
 *           $ref: '#/definitions/comment'
 */
router.get('/profiledate/:id', function (req, res) {
  Comments.find({ profile_id: req.params.id }).sort({ date: 'desc' }).limit(10).exec(function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

/* 
Post method to save a comment a user submits on a post
Link - /comment/post
*/
/**
 * @swagger
 * /api/comment/post:
 *   post:
 *     tags:
 *       - comments
 *     description: Creates a new comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: comment
 *         description: Comment object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/comment'
 *     responses:
 *       200:
 *         description: Successfully created comment
 */
router.post('/post', function (req, res, next) {
  Comments.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// export router as router
module.exports = router;