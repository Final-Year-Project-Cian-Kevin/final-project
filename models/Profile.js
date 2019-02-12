var mongoose = require('mongoose');
// https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f
// use to hash password 
var bcrypt = require('bcrypt-nodejs');

// build model of userSchema
// username must be unique and is required
var ProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
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
  }
});




// Export UserSchema model ad User
module.exports = mongoose.model('Profile', ProfileSchema);
