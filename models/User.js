var mongoose = require('mongoose');
// https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f
// use to hash password 
var bcrypt = require('bcrypt-nodejs');
var config = require('../config/database');
var jwt = require('jsonwebtoken');

// Schema used to 'filter' data to be stored in the 'UserSchema' collection in mongo
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
  },
  first_name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  join_date: {
    type: Date,
    default: Date.now
  },
  bio: {
    type: String,
    default: 'Tell me about yourself'
  },
  image:{
    type: String,
    default: 'profile.jpg'
  },
  password: {
    type: String,
    required: true
  }

});
// define pre hook for document
UserSchema.pre('save', function (next) {
  var user = this;
  // if password new or edited
  if (this.isModified('password') || this.isNew) {
    // generate a salt and process data for 10 rounds
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      // generate a hash of password
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// compare password for log in
UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
/**
 * Return a public user object
 */
UserSchema.methods.toPublicUserJson = function (user) {
  return {
    username: this.username,
    first_name: this.first_name,
    surname: this.surname,
    bio: this.bio,
    image: this.image,
    join_date:this.join_date,
    email: this.email
  };
};
/**
 * Return a private user object
 */
UserSchema.methods.toPrivateUserJson = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};
// Method to generate JWT token
UserSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, config.secret);
};

module.exports = mongoose.model('User', UserSchema);
