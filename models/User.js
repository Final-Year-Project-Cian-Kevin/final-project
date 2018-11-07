var mongoose = require('mongoose');
// build model
var UserSchema = new mongoose.Schema({
    _id: String,
    username: String,
    userpassword: String
});

// Export UserSchema model ad User
module.exports = mongoose.model('User', UserSchema);