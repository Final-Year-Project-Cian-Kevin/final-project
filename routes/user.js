// !!!!!!!!!!!!!!!!!!!!!!!! MUST REFACTOR THIS CLASS AS api.js
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Authnitcation imports
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

// Import required models
var User = require("../models/user");
var Profile = require("../models/profile");
var Follow = require("../models/follow");

/**
 * Create router to register new user
 */
router.post('/signup', function (req, res) {
  console.log('\x1b[34m%s\x1b[0m', "DEBUG : POST USER signup"); //blue cmd

  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      msg: 'Please enter username and password.'
    });
  } else {
    // create user object
    var newUser = new User({
      username: req.body.username,
      email: req.body.email,
      first_name: req.body.first_name,
      surname: req.body.surname,
      password: req.body.password
    });

    newUser.save(function (err) {
      if (err) {

        // Error message for generic server error.
        var serverError = 'A server error has occurred please try again';
        var serverErrorMsg="[Error] - register error occured";

        // Confirm if error is due to dupliacte email or username added.
        if (err.errmsg.includes('email')) {
          serverError = "Email already in use please choose another";
          serverErrorMsg= "[Error] - register error duplicate email found";
        } else if (err.errmsg.includes('username')) {
          serverError = "Username already in use please choose another";
          serverErrorMsg = "Username already in use please choose another";
        }

        // Return a 401 error if duplicate key found.
        console.log(serverErrorMsg);
        return res.status(401).send({
          success: false,
          msg: serverError
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
  // console.log('DEBUG : Router post signin');
  console.log('\x1b[34m%s\x1b[0m', "DEBUG : Router post signin"); //blue cmd

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
          // user.token = user.generateJWT();

          // var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          // res.json({
          //   success: true,
          //   token: 'JWT ' + user.toPrivateUserJson()
          // });
          res.json({
            success: true,

            token: user.generateJWT()
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

// Get user details for profiles
router.get('/profile/:id', function (req, res, next) {
  User.find({
    username: req.params.id
  }).lean().select('username bio image email first_name surname join_date').exec(function (err, user) {
    res.json(user);
  });
});

/**
 * Update a users details.
 * Returns a 401 status code if email is duplicate.
 */
router.put('/update/:id', function (req, res, next) {

  User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) {
      console.error("[ERROR] - update - email already in system ");
      return res.status(401).send({
        success: false,
        msg: 'Email already exists, please choose another.'
      });
    }
    res.json({
      success: true,
      msg: 'Successful user account edited.'
    });
  });
});

/** 
 * Return all following data
 */
router.get('/follow/:id', function (req, res) {

  const username = req.params.id;
  console.log("[DEBUG]: /follow username", username);
  //console.log(req);
  User.findOne({
    'username': username
  }, function (err, user) {
    if (!user) {
      console.log("[DEBUG]: /follow : no user found");

      return res.json({
        'state': false,
        'msg': `No user found with username ${username}`,
        'err': err
      })
    } else {
      const user_id = user._id;

      console.log("[DEBUG]: /follow :  user found");
      console.log("[DEBUG]: /follow :  uid", user_id);

      Follow.aggregate([{
          $match: {
            "user": mongoose.Types.ObjectId(user_id)
          }
        },
        {
          $lookup: {
            "from": "users",
            "localField": "following",
            "foreignField": "_id",
            "as": "userFollowing"
          }
        },
        {
          $lookup: {
            "from": "users",
            "localField": "followers",
            "foreignField": "_id",
            "as": "userFollowers"
          }
        }, {
          $project: {
            "user": 1,
            "userFollowers": 1,
            "userFollowing": 1
          }
        }
      ]).exec(function (err, doc) {
        console.log("[DEBUG] Follow/:id");
        console.log(doc);
        res.json({
          'state': true,
          'msg': 'Follow list',
          'doc': doc
        })
      })
    }

  })

});
// export router as module
module.exports = router;
