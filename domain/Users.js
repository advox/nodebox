var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var UserSchema = new Schema({
    id: Number,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String
});

Mongoose.connect('mongodb://localhost/nodebox');
Mongoose.model('User', UserSchema);

var User = Mongoose.model('User');

exports = module.exports = User;