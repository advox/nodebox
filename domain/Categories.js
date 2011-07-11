/**
 * Created at 10.07.11 02.00 by jesper
 */
var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var CategorySchema = new Schema({
    'id': {type: Number, unique: true },
    'title': String
});

Mongoose.connect('mongodb://localhost/nodebox');
Mongoose.model('Category', CategorySchema);

var Category = Mongoose.model('Category');

exports = module.exports = Category;