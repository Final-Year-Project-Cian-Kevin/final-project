var mongoose = require('mongoose');

// Schema used to 'filter' data to be stored in the 'Reddit' collection in mongo
var Reddit = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  pic: {
    type: String,
    required: false
  },
  thumbnail: {
    type: String,
    required: false
  },
  subreddit: {
    type: String,
    required: true
  },
  selftext: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Reddit', Reddit, 'Reddit');
