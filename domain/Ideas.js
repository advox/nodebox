/**
 * Created at 09.07.11 15.10 by jesper
 */
var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema,
    Users = require('./Users');

var IdeaSchema = new Schema({
    'id': {type: Number, unique: true},
    //'author': [Users],
    'date': { type: Date, 'default': Date.now() },
    'title': String,
    'content': String,
    'votes': { type: Number, 'default': 0 }
    //'category': [Categories],
    //'comments': [Comments]
});

Mongoose.connect('mongodb://localhost/nodebox');
Mongoose.model('Idea', IdeaSchema);

var Idea = Mongoose.model('Idea');

exports = module.exports = Idea;