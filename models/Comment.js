var mongoose = require('mongoose');

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
  description: {
    type: String,
    required: true
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Comments', CommentSchema, 'Comments');
