var mongoose = require('mongoose');

// Schema used to 'filter' data to be stored in the 'Comments' collection in mongo.
var CommentSchema = new mongoose.Schema({
  post_id: {
    type: String,
    required: true
  },
  profile_id: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comments', CommentSchema, 'Comments');
