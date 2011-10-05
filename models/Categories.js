/**
 * Created at 10.07.11 02.00 by jesper
 */

var config = require('../config.js'), Sequelize = require('sequelize'), db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host:config.db.host,
    port:config.db.port
}), IdeaDB = db.import(__dirname + '/../domain/Ideas'), CategoryDB = db.import(__dirname + '/../domain/Categories');

var Category = {
};

exports = module.exports = Category;