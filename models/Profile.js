var mongoose = require('mongoose');

// Schema used to 'filter' data to be stored in the 'ProfileSchema' collection in mongo.
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

module.exports = mongoose.model('Profile', ProfileSchema);
