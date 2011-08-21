var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema,
    UserSchema = new Schema({
    'id': {type: Number, unique: true },
    'firstName': String,
    'lastName': String,
    'username': String,
    'email': String,
    'password': String
});

Mongoose.model('User', UserSchema);
Mongoose.connect('mongodb://localhost/nodebox');

var User = Mongoose.model('User');

exports = module.exports = User;