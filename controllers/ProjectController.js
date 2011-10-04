var Project = require('../models/Projects');

var ProjectController = {
    create: function(req, res) {
        var project = new Project();

        var newProject = {
            title: req.body.title,
            description: req.body.description
        };
        project.create(newProject, function() {
           res.redirect('/projects');
        });
    },
    find: function(id, callback) {
      var project = new Project();
        project.find(id, function(project) {
            callback(project);
        });
    },
    findAll: function(callback) {
        var project = new Project();
        project.findAll(function(projects) {
            callback(projects);
        });
    }
};

exports = module.exports = ProjectController;