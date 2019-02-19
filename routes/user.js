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

/**
 * Create router to register new user
 */
router.post('/signup', function (req, res) {
  // console.log("DEBUG_user.jsPOSTUSER /signup")
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
    var newProfile = new Profile({
      username: req.body.username,
      first_name: req.body.first_name,
      surname: req.body.surname
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
    newProfile.save();
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

            token : user.generateJWT()
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

if (token) {
    User.findById(token.username,function (err, user) {
      if (err) return next(err);
      console.log("DEBUG get user >>",user.toPrivateUserJson());
      res.json(user.toPrivateUserJson());
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
});
/* GET home page. Test api*/
//router.get('/', function(req, res, next) {
// res.sendStatus('Recieved from api');
//});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Current logged in username by decoding jwt
router.get('/userdata/:id', function (req, res, next) {
  var userData = jwt.decode(req.params.id, config.secret)
  res.json(userData.username);
});

router.get('/profile/:id', function (req, res, next) {
  User.find({username: req.params.id}).lean().select('username').exec(function(err, user) {
    res.json(user);
  });
});


router.put('/update/:id', function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

// export router as module
module.exports = router;
