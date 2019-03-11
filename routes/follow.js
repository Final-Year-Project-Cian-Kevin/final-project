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
 *  Add data to 'follows' table.
 */
router.post('/add', function (req, res) {
  const user_id = req.body.user_id;
  const to_follow_id = req.body.follow_id;
  // Inilise bulk object
  let followBuilder = Follow.collection.initializeUnorderedBulkOp();

  // Add follower data to set.
  followBuilder.find({
    'user': mongoose.Types.ObjectId(user_id)
  }).upsert().updateOne({
    $addToSet: {
      following: mongoose.Types.ObjectId(to_follow_id)
    }
  });

  // Add following data to set.
  followBuilder.find({
    'user': mongoose.Types.ObjectId(to_follow_id)
  }).upsert().updateOne({
    $addToSet: {
      followers: mongoose.Types.ObjectId(user_id)
    }
  });

  // Execute bulk command
  followBuilder.execute(function (err, doc) {
    if (err) {
      console.log("[Server Error - follow/add]", err)
      return res.json({
        'state': false,
        'msg': err
      })
    }
    console.log("[Server Success - follow/add]", err)
    res.json({
      'state': true,
      'msg': 'User Followed'
    })
  })
})

/**
 * Remove data from 'follows' table.
 */
router.post('/remove', function (req, res) {
  const user_id = req.body.user_id;
  const to_unfollow_id = req.body.follow_id;

  let followBuilder = Follow.collection.initializeUnorderedBulkOp();

  // Remove following data from set.
  followBuilder.find({
    'user': mongoose.Types.ObjectId(user_id)
  }).upsert().updateOne({
    $pull: {
      following: mongoose.Types.ObjectId(to_unfollow_id)
    }
  });

  // Remove follower data from set.
  followBuilder.find({
    'user': mongoose.Types.ObjectId(to_unfollow_id)
  }).upsert().updateOne({
    $pull: {
      followers: mongoose.Types.ObjectId(user_id)
    }
  })

  // Execute bulk command
  followBuilder.execute(function (err, doc) {
    if (err) {
      console.log("[Server Error - follow/remove]", err)
      return res.json({
        'state': false,
        'msg': err
      })
    }
    console.log("[Server Success - follow/remove]", err)
    res.json({
      'state': true,
      'msg': 'User unfollowed'
    })
  })
})

/** 
 * Return all following data
 */
router.get('/follow/:id', function (req, res) {

  const username = req.params.id;
  //console.log("[DEBUG]: /follow username", username);
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

      // console.log("[DEBUG]: /follow :  user found");
      // console.log("[DEBUG]: /follow :  uid", user_id);

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
        //  console.log("[DEBUG] Follow/:id");
        //  console.log(doc);
        res.json({
          'state': true,
          'msg': 'Follow list',
          'doc': doc
        })
      })
    }

  })

});

/** 
 * Return all following data
 * ================================ METHOD DEVELOPMENT IN PROGRESS ===================================
 */
router.get('/following/:id', function (req, res) {

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
