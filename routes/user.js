// !!!!!!!!!!!!!!!!!!!!!!!! MUST REFACTOR THIS CLASS AS api.js
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Authnitcation imports
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var User = require("../models/user");

/**
 * Create router to register new user
 */
router.post('/signup', function (req, res) {
  console.log("DEBUG_user.jsPOSTUSER /signup")
  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      msg: 'Please enter username and password.'
    });
  } else {
    // create user object
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({
          success: false,
          msg: 'Username already exists, please choose another.'
        });
      }
      res.json({
        success: true,
        msg: 'Successful user account created.'
      });
    });
  }
});

/**
 * Create router to login
 */
router.post('/signin', function (req, res) {
  console.log('DEBUG : Router post signin');

  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;

    // check if valid user
    if (!user) {
      res.status(401).send({
        success: false,
        msg: 'Log in failed. User not found.'
      });
    } else {
      // check if password correct
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({
            success: true,
            token: token
          });
        } else {
          res.status(401).send({
            success: false,
            msg: 'Incorrect password.'
          });
        }
      });
    }
  });
});

// Current logged in username by decoding jwt
router.get('/userdata/:id', function (req, res, next) {
  var userData = jwt.decode(req.params.id, config.secret)
  res.json(userData.username);
});

/**
 *  parse authorization token from request headers.
 */
getToken = function (headers) {
  console.log("DEBUG: book.js get token");
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

router.get('/users', function (req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});



// export router as module
module.exports = router;
