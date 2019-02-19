var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require("../models/user");

/** 
 * GET to return all users from db in public format
 */
router.get('/get', function (req, res, next) {

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
 * GET to user based on username or id
 */
router.get('/:details', function (req, res, next) {
  User.findOne({
      $or: [{
        username: req.body.details
      }, {
        userId: req.body.details
      }]
    },
    function (err, user) {
      if (err) return next(err);
      res.json(user.toPublicUserJson());
    });
});
// export router as module
module.exports = router;
