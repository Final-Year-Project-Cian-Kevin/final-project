var mongoose = require('mongoose');

// Schema used to 'filter' data to be stored in the 'RedditPop' collection in mongo
var RedditPop = new mongoose.Schema({
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
    required: true
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
module.exports = mongoose.model('RedditPop', RedditPop, 'RedditPop');
