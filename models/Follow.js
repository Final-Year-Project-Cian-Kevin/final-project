var mongoose = require('mongoose');

let Schema = mongoose.Schema;

var FollowSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'Card'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'Card'
  }]
}, { toJSON: { virtuals: true } }
);
 
module.exports = mongoose.model('Follow', FollowSchema);