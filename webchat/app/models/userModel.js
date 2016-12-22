// app/models/user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var user   = new Schema({
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('User', user);
