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
