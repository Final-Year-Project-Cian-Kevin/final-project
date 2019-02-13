var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Profile = require("../models/profile");

router.get('/get', function (req, res, next) {
    Profile.find(function (err, profiles) {
    if (err) return next(err);
    res.json(profiles);
    console.log('\x1b[34m%s\x1b[0m', "DEBUG : Get profile test");
  });
});

// export router as module
module.exports = router;
