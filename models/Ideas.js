/**
 * Created at 09.07.11 15.31 by jesper
 */
var config = require('../config.js'), Sequelize = require('sequelize'), db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host:config.db.host,
    port:config.db.port
}), IdeaDB = db.import(__dirname + '/../domain/Ideas');

var Idea = {
    create:function(newIdea, callback) {
        var Idea = IdeaDB.build({
            title:newIdea.title,
            description:newIdea.description,
            content:newIdea.content,
            UserId:newIdea.user.id,
            ProjectId:newIdea.project
        });

        Idea
            .save()
            .on('failure', function(err) {
                console.log(err);
            })
            .on('success', function() {
                callback(Idea);
            });

    },
    update:function(updatedValues, callback) {
        var Idea = IdeaDB
            .updateAttributes(updatedValues)
            .on('success', function() {
                callback(Idea)
            })
    },
    findAll:function(callback) {
        IdeaDB.findAll().on('success', function(ideas) {
            callback(ideas);
        });
    },
    find:function(id) {
        IdeaDB.findOne({id:id}, function(err, idea) {
            return idea;
        })
    }
};

exports = module.exports = Idea;