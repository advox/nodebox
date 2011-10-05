var Project = require('../models/Projects');

var ProjectController = {
    create: function( req, res ) {
        var newProject = {
            title: req.body.title,
            description: req.body.description
        };
        Project.create(newProject, function() {
            res.redirect('/projects');
        });
    },
    find: function( id, callback ) {
        Project.find(id, function( project ) {
            callback(project);
        });
    },
    findAll: function( callback ) {
        Project.findAll(function( projects ) {
            callback(projects);
        });
    },
    findIdeas: function( projectId, callback ) {
        Project.findIdeas(projectId, function( ideas ) {
            callback(ideas);
        });
    }
};

exports = module.exports = ProjectController;