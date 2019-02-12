var mongoose = require('mongoose');


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

// Export ProfileSchema model as Profile
module.exports = mongoose.model('Profile', ProfileSchema);
