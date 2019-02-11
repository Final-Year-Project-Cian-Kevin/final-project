var mongoose = require('mongoose');

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
  thumbnail: {
    type: String,
    required: true
  },
  subreddit: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }

});
module.exports = mongoose.model('Reddit', Reddit, 'Reddit');
