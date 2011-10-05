var config = require('../config.js'), Sequelize = require('sequelize'), db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host:config.db.host,
    port:config.db.port
}), IdeaDB = db.import(__dirname + '/../domain/Ideas'), ProjectDB = db.import(__dirname + '/../domain/Projects');

var Project = {
    create:function(newProject, callback) {
        var project = ProjectDB.build({
            title:newProject.title,
            description:newProject.description
        });

        project.save().on('success', function() {
            callback();
        });
    },
    find:function(projectId, callback) {
        ProjectDB.find({where:{id:projectId}}).on('success',
            function(project) {
                callback(project);
            }).on('failure', function() {
                callback(null);
            });
    },
    findAll:function(callback) {
        ProjectDB.findAll().on('success', function(projects) {
            callback(projects);
        });
    },
    findIdeas:function(projectId, callback) {
        IdeaDB.findAll({where:{ ProjectId:projectId }}).on('success', function(ideas) {
            callback(ideas);
        });
    }
};

exports = module.exports = Project;