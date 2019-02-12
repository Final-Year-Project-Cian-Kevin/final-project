/** 
 * API routes for accessing user profiles
*/
var express = require('express');
var router = express.Router();
//var User = require('../models/User.js');

var mongoose = require('mongoose');

// Authenitcation imports
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

// Import required models
var User = require("../models/user");
var Profile = require("../models/profile");




    



/**
 * Get request for all profiles
 * User must be authorized
 
router.get('/', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    Profile.find(function (err, profiles) {
      if (err) return next(err);
      res.json(profiles);
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized access to profiles.'
    });
  }
});
*/
/**
 * GET Method to return profile details
 */
router.get('/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log('\x1b[34m%s\x1b[0m', "DEBUG : Get profile by id is token"); //blue cmd

    Profile.findOne({
      username: req.body.username
    }, function (err, profile) {
      if (err) return next(err);
      res.json(profile);
    });
  } else {
    console.log('\x1b[34m%s\x1b[0m', "DEBUG : Get profile by id is not token"); //blue cmd

    return res.status(403).send({
      success: false,
      msg: 'Unauthorized access to profile.'
    });
  }
});

/**
 *  parse authorization token from request headers.
 */
getToken = function (headers) {
  console.log("DEBUG: book.js get token");
  console.log('\x1b[34m%s\x1b[0m', "DEBUG : user.js getToken"); //blue cmd

  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
/* Get ALl Profiles */

router.get('/', function (req, res, next) {
    Profile.find(function (err, profiles) {
    if (err) return next(err);
    res.json(profiles);
    console.log('\x1b[34m%s\x1b[0m', "DEBUG : Get profile test"); //blue cmd

    //res.send('Recieved from api');
  });
});
/* GET home page. Test api*/
//router.get('/', function(req, res, next) {
// res.sendStatus('Recieved from api');
//});

/* GET SINGLE BOOK BY ID
router.get('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
 */


// export router as module
module.exports = router;
