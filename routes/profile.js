/**
 * @swagger
 * definition:
 *   profile:
 *     properties:
 *       username:
 *         type: string
 *       first_name:
 *         type: string
 *       surname:
 *         type: string
 *       bio:
 *         type: string
 *       image:
 *         type: string
 *       join_date:
 *         type: string
 *       email:
 *         type: string
 */

// Imports used.
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require("../models/user");

/** 
Get to return all users from db in public format
Link - api/profile/all
 */
/**
 * @swagger
 * /api/profile/all:
 *   get:
 *     tags:
 *       - profiles
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/profile'
 */
router.get('/all', function (req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    // Convert each user to public profile
    for (var i = 0; i < users.length; i++) {
      users[i] = users[i].toPublicUserJson();
    }
    res.json(users);
  });
});

/** 
GET to user based on username or id
Link - api/profile/{id}
 */
/**
 * @swagger
 * /api/profile/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *           type: id
 *         description: The users ID or username
 *     tags:
 *       - profiles
 *     description: Returns users profile data with username or user ID
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of profile data
 *         schema:
 *           $ref: '#/definitions/profile'
 */
router.get('/:id', function (req, res, next) {
  User.find({
    $or: [{
      username: req.params.id
    }, {
      userId: req.params.id
    }]
  }).lean().select('username bio image email first_name surname join_date').exec(function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

// export router as module
module.exports = router;
