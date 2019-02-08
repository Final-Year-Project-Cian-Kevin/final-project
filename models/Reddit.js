var mongoose = require('mongoose');

var RedditSchema = new mongoose.Schema({
  id: {
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
  }
});
module.exports = mongoose.model('Reddit', RedditSchema);
