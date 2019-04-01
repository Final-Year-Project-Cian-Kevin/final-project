/**
 * @swagger
 * definition:
 *   reddit:
 *     properties:
 *       _id:
 *         type: string
 *       title:
 *         type: string
 *       url:
 *         type: string
 *       pic:
 *         type: string
 *       thumbnail:
 *         type: string
 *       subreddit:
 *         type: string
 *       selftext:
 *         type: string
 */

 // Imports used
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var RedditPop = require('../models/Reddit/PopularFunny.js');
var RedditNews = require('../models/Reddit/News.js');
var Reddit = require('../models/Reddit/RedditAll.js');
var UserPost = require('../models/UserPost.js');

/* 
Post method for user posts
Link - api/redditapi/postall
*/
/**
 * @swagger
 * /api/redditapi/postall:
 *   post:
 *     tags:
 *       - posts
 *     description: Creates a new global post
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: post
 *         description: Post object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/reddit'
 *     responses:
 *       200:
 *         description: Successfully created post
 */
router.post('/postall', function(req, res, next) {

    if(req.body.url.indexOf(".png") > -1 || req.body.url.indexOf(".jpg") > -1 || req.body.url.indexOf(".gif") > -1 || req.body.url.indexOf(".jpeg") > -1){
        req.body.pic = req.body.url;
        req.body.thumbnail = req.body.url;
    }else{
        req.body.pic = "";
        req.body.thumbnail = 'http://localhost:3000/api/assets/images/userContent.png';
    }

    Reddit.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* 
Post method for user posts
Link - api/redditapi/postuser
*/
/**
 * @swagger
 * /api/redditapi/postuser:
 *   post:
 *     tags:
 *       - posts
 *     description: Creates a new user post
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: post
 *         description: Post object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/reddit'
 *     responses:
 *       200:
 *         description: Successfully created user post
 */
router.post('/postuser', function(req, res, next) {
    if(req.body.url.indexOf(".png") > -1 || req.body.url.indexOf(".jpg") > -1 || req.body.url.indexOf(".gif") > -1 || req.body.url.indexOf(".jpeg") > -1){
        req.body.pic = req.body.url;
        req.body.thumbnail = req.body.url;
    }else{
        req.body.pic = "";
        req.body.thumbnail = 'http://localhost:3000/api/assets/images/userContent.png';
    }

    UserPost.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* 
Get method for Popular/Funny sorted subreddit posts
Link - api/redditapi/pf
*/
/**
 * @swagger
 * /api/redditapi/pf:
 *   get:
 *     tags:
 *       - posts
 *     description: Returns top Popular/Funny posts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Popular/Funny posts
 *         schema:
 *           $ref: '#/definitions/reddit'
 */
router.get('/pf', function(req, res){
    RedditPop.find(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
    });
});


/* 
Get method for news subreddit posts 
Link - api/redditapi/news
*/
/**
 * @swagger
 * /api/redditapi/news:
 *   get:
 *     tags:
 *       - posts
 *     description: Returns top news posts from various subreddits
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of news posts
 *         schema:
 *           $ref: '#/definitions/reddit'
 */
router.get('/news', function(req, res){
    RedditNews.find(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
    });
});

/* 
Get method for User Posts 
Link - api/redditapi/userpost
*/
/**
 * @swagger
 * /api/redditapi/userpost:
 *   get:
 *     tags:
 *       - posts
 *     description: Returns recent user posts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of recent user posts
 *         schema:
 *           $ref: '#/definitions/reddit'
 */
router.get('/userpost', function(req, res){
    UserPost.find({}).sort({date: 'desc'}).limit(10).exec(function(err, posts){ 
        if (err) return next(err);
        res.json(posts);
     });
});

/* 
Get method for User Posts with user id
Link - api/redditapi/userpostid
*/
/**
 * @swagger
 * /api/redditapi/userpostid/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *           type: id
 *         description: Get all posts by specific username
 *     tags:
 *       - posts
 *     description: Returns users posts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array users posts
 *         schema:
 *           $ref: '#/definitions/reddit'
 */
router.get('/userpostid/:id', function(req, res){
    UserPost.find({subreddit: req.params.id}).sort({date: 'desc'}).limit(10).exec(function(err, posts){ 
        if (err) return next(err);
        res.json(posts);
     });
});

/* 
Get method for all posts
Link - api/redditapi/all
*/
/**
 * @swagger
 * /api/redditapi/all:
 *   get:
 *     tags:
 *       - posts
 *     description: Returns all posts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of posts
 *         schema:
 *           $ref: '#/definitions/reddit'
 */
router.get('/all', function(req, res){
    Reddit.find(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
    });
});

/* 
This route is used by individual post to get their information when called
Get method for specific post using ID
Link - api/redditapi/all/:id
*/
/**
 * @swagger
 * /api/redditapi/all/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *           type: id
 *         description: Get specific post by posts ID
 *     tags:
 *       - posts
 *     description: Returns post data using post ID
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A single post
 *         schema:
 *           $ref: '#/definitions/reddit'
 */
router.get('/all/:id', function (req, res, next) {
    Reddit.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* 
Get method for specific posts by using username
Link - api/redditapi/allprofile/:id
*/
/**
 * @swagger
 * /api/redditapi/allprofile/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *           type: id
 *         description: Get recent posts by specific username
 *     tags:
 *       - posts
 *     description: Returns recent users posts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array recent user posts
 *         schema:
 *           $ref: '#/definitions/reddit'
 */
router.get('/allprofile/:id', function (req, res, next) {
    Reddit.find({subreddit: req.params.id}).sort({date: 'desc'}).limit(10).exec(function(err, posts){ 
        if (err) return next(err);
        res.json(posts);
     });
});

// export router as router
module.exports = router;