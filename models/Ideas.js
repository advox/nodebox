/**
 * Created at 09.07.11 15.31 by jesper
 */
var IdeaDBContext = require('../domain/Ideas');

var Idea = function() {
    return {
        create: function(newIdea, success) {
            var idea = new IdeaDBContext({title: newIdea.title, content: newIdea.content});
            idea.save(function(err) {
                if(err){
                    console.log(err);
                }
                else {
                    success();
                }
            });
        },
        findAll: function(callback) {
            IdeaDBContext.find(function(error, ideas) {
                callback(error, ideas);
            });
        },
        find: function(id) {
            IdeaDBContext.findOne({id: id}, function(err, idea) {
                return idea;
            })
        }
    };
};

exports = module.exports = Idea;