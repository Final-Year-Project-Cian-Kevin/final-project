// Import libaries for passport.
var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

// Get the user model.
var User = require('../models/user');

// Get the cdatabase config file.
var config = require('../config/database');

// Import logger to handle server logging. 
var logger = require("../config/serverlogger").Logger;

/**
 * Validate user token with token recieved from client.
 *
 * @param {*} passport
 */
module.exports = function (passport) {

  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;

  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({
      id: jwt_payload.id
    }, function (err, user) {
      if (err) {
        logger.error("[Passport] : passport error occured");
        return done(err, false);
      }
      if (user) {
        logger.info("[Passport] : User verified");
        done(null, user);
      } else {
        logger.info("[Passport] : User verification failed");
        done(null, false);
      }
    });
  }));
};
