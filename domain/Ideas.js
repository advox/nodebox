/**
 * Created at 09.07.11 15.10 by jesper
 */
var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema,
    IdeaSchema = new Schema({
        'date': { type: Date, 'default': Date.now() },
        'title': String,
        'content': String,
        'votes': { type: Number, 'default': 0 }
    });

Mongoose.model('Idea', IdeaSchema);
Mongoose.connect('mongodb://localhost/nodebox');

var Idea = Mongoose.model('Idea');

exports = module.exports = Idea;