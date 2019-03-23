var mongoose = require('mongoose');

// Schema used during early devlopement to test functionality of the 'MEAN' stack
var BookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  published_year: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Book', BookSchema);
