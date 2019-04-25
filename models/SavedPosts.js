var mongoose = require('mongoose');

// Schema used to 'filter' data to be stored in the 'SavedPosts' collection in mongo.
var SavedPosts = new mongoose.Schema({
  post_id: {
    type: String,
    required: true
  },
  profile_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SavedPosts', SavedPosts, 'SavedPosts');
