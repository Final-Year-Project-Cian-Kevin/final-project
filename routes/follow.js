/**
 * @swagger
 * definition:
 *   follow:
 *     properties:
 *       user_id:
 *         type: string
 *       follow_id:
 *         type: string
 */

// Imports used.
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Authenitcation imports.
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

// Import required models.
var User = require("../models/user");
var Profile = require("../models/profile");
var Follow = require("../models/follow");

// Import logger to handle server logging. 
var logger = require("../config/serverlogger").Logger;

/**
Post data to follows table
Link - api/follow/add
*/
/**
 * @swagger
 * /api/follow/add:
 *   post:
 *     tags:
 *       - follow
 *     description: Follow user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: follow
 *         description: Follow object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/follow'
 *     responses:
 *       200:
 *         description: Successfully followed user
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

  // Execute bulk command.
  followBuilder.execute(function (err, doc) {
    if (err) {
      logger.error("[Follow] : error adding " + err);
      return res.json({
        'state': false,
        'msg': err
      })
    }
    logger.info("[Follow] : user Followed ");
    res.json({
      'state': true,
      'msg': 'User Followed'
    })
  })
})

/**
Remove data from follows table
Link - api/follow/remove
*/
/**
 * @swagger
 * /api/follow/remove:
 *   post:
 *     tags:
 *       - follow
 *     description: Follow user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: follow
 *         description: Follow object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/follow'
 *     responses:
 *       200:
 *         description: Successfully removed followed user
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
      logger.error("[Follow] : error removing follower " + err);
      return res.json({
        'state': false,
        'msg': err
      })
    }
    logger.error("[Follow] : follower removed");
    res.json({
      'state': true,
      'msg': 'User unfollowed'
    })
  })
})

/**
Return all following data by user
Link - api/follow/{id}
*/
/**
 * @swagger
 * /api/follow/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: id
 *         description: The users username
 *     tags:
 *       - follow
 *     description: Returns all following data of the given user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of following data
 */
router.get('/:id', function (req, res) {
  const username = req.params.id;
  User.findOne({
    'username': username
  }, function (err, user) {
    if (!user) {
      return res.json({
        'state': false,
        'msg': `No user found with username ${username}`,
        'err': err
      })
    } else {
      const user_id = user._id;
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
Return an json object containing a list of usernames that are followed
Link - api/check/{id}
*/
/**
 * @swagger
 * /api/follow/check/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: id
 *         description: Checks if user is follow given user
 *     tags:
 *       - follow
 *     description: Returns if user is follow given user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User following check data
 */
router.get('/check/:id', function (req, res) {
  const username = req.params.id;
  logger.info("[Follow] - User " + username + " has requested following list.")

  User.findOne({
    'username': username
  }, function (err, user) {
    if (!user) {
      logger.info("[Follow](fail) - User " + username + " has requested following list.")

      return res.json({
        'state': false,
        'msg': `No followers found for ${username}`,
        'err': err
      })
    } else {
      const user_id = user._id;

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
        $project: {
          "userFollowing": 1
        }
      }
      ]).exec(function (err, doc) {
        let followinglist = [];
        let fList = [];

        doc.forEach(function (obj) {
          followinglist = followinglist.concat(obj.userFollowing);
        });

        followinglist.forEach(function (value) {
          //console.log(value.username);
          fList.push(value.username);
        });

        logger.info("[Follow](Success) - User " + username + " has requested following list.")
        res.json({
          'state': true,
          'msg': 'Following list',
          'followlist': fList
        })
      })
    }
  })
});

// export router as module
module.exports = router;