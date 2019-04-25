var mongoose = require('mongoose');

let Schema = mongoose.Schema;

// Schema used to 'filter' data to be stored in the 'Follow' collection in mongo
var FollowSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { toJSON: { virtuals: true } }
);

module.exports = mongoose.model('Follow', FollowSchema);