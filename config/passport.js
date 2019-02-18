var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

// Get the user model
var User = require('../models/user');
// Get the cdatabase config file
var config = require('../config/database');

// more info at https://jwt.io/introduction/
// allow only requests with valid tokens
// match jwt token with token from client
module.exports = function (passport) {
  console.log('\x1b[34m%s\x1b[0m', "DEBUG : Passport.js Calling main function"); //blue cmd

  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;

  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({
      id: jwt_payload.id
    }, function (err, user) {
      if (err) {
        console.debug("DEBUG:passporterrf");

        return done(err, false);
      }
      if (user) {
        console.debug("DEBUG:passportjs pass if");
        console.debug("DEBUG:passportjs pass if =====UID:", user.id);
        console.debug("DEBUG:passportjs pass if ====JUID:", jwt_payload.id);
        done(null, user);
      } else {
        console.debug("DEBUG:passportjs fail if");
        console.debug("DEBUG:passportjs fail if =====UID:", user.id);
        console.debug("DEBUG:passportjs fail if ====JUID:", jwt_payload.id);
        done(null, false);
      }
    });
  }));


};
