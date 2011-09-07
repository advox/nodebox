/**
 * Created at 22.08.11 23.16 by jesper
 */
var Idea = require("../models/Ideas");
var IdeaController = {
	create: function(req, res) {
		var idea = new Idea();
        
	    var newIdea = {	
	        title: req.body.title,
            description: req.body.description,
	        content: req.body.content
	    };

		idea.create(newIdea, function(idea) {
			if(idea) {
				res.redirect('/ideas');
			}
		});
	},
	findAll: function(callback) {
		var idea = new Idea();
		idea.findAll(callback);
	}
};
exports = module.exports = IdeaController;