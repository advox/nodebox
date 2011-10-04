// DB Setup
var config = require('../config.js'),
    Sequelize = require('sequelize'),
    db = new Sequelize(config.db.database, config.db.user, config.db.password, {
        host: config.db.host,
        port: config.db.port
    }),
    Idea = db.import(__dirname + '/../domain/Ideas'), // Feels kinda hacky, must be a better way to resolve the path than this... 
    User = db.import(__dirname + '/../domain/Users'),
    Project = db.import(__dirname + '/../domain/Projects');


var Mappings = {
    map: function() {
        // Idea Mappings
        User.hasMany(Idea, { as:'Ideas'});
        Project.hasMany(Idea, {as: 'Ideas'});
    },
    sync: function() {
        db.sync().on('failure', function(e) {
            console.log("ERROR: \n" + e);
        });
    }
};

exports = module.exports = Mappings;