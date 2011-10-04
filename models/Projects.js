var config = require('../config.js'),
    Sequelize = require('sequelize'),
    db = new Sequelize(config.db.database, config.db.user, config.db.password, {
        host: config.db.host,
        port: config.db.port
    }),
    ProjectDB = db.import(__dirname + '/../domain/Projects');

var Project = function() {
    return {
        create: function(newProject, callback) {
            var project = ProjectDB.build({
                title: newProject.title,
                description: newProject.description
            });

            project.save().on('success', function() {
                callback();
            });
        },
        find: function(id, callback) {
            ProjectDB.find({where: {id: id}}).on('success', function(project) {
               callback(project);
            }).on('failure', function() {
                callback(null);
            });
        },
        findAll: function(callback) {
            ProjectDB.findAll().on('success', function(projects) {
                callback(projects);
            });
        }
    };
};

exports = module.exports = Project;