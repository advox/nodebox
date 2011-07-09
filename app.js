/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer(),
    publicDir = __dirname + '/public';

// Configuration

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'mustache');
    app.register('mustache', require('stache'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'abc123' }));
    app.use(express.compiler({src: publicDir, enable: ['less']}));
    app.use(app.router);
    app.use(express.static(publicDir));
});

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});

function requiresLogin(req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        res.redirect('/auth?redir=' + req.url);
    }
}

// DB Stuff
var Idea = require('./models/Ideas');
var User = require('./models/Users');

// Routes

app.get('/', requiresLogin, function(req, res) {
    res.render('index', {
        locals: {
            title: 'Express'
        }
    });
});

/*
 Authentication
 */

app.get('/auth', function(req, res) {
    res.render('authentication/', {
        locals: {
            title: "Easy, tiger. You need to be logged in to do that"
        }
    });
});

app.get('/auth/signup', function(req, res) {
    res.render('authentication/signup', {
        locals: {
            title: "Register you account"
        }
    });
});

app.post('/auth/signup', function(req, res) {
    if (req.body.password != req.body.password2) {
        res.redirect('/auth/signup', {
            locals: {
                error: {
                    message: "The passwords didn't match"
                }
            }
        });
    }

//    var user = new User();
//    user.create(newUser, function(err) {
//        if (err) {
//            if (err.type == 'pw_mismatch') {
//
//                return false;
//            }
//            if (err.type == 'user_exists') {
//                res.redirect('/auth/signup', {
//                    locals: {
//                        error:{
//                            message: "A user with that name already exists, please choose another one"
//                        }
//                    }
//                });
//                return false;
//            }
//        }
//    });
});

/*
 * Ideas
 */

app.get('/ideas', requiresLogin, function(req, res) {
    var idea = new Idea();
    idea.findAll(function(error, ideas) {
        res.render('idea/index', {
            locals: {
                title: "Ideas",
                ideas: ideas
            }
        });
    });
});

app.get('/idea/create', requiresLogin, function(req, res) {
    res.render('idea/create');
});

app.post('/idea/create', requiresLogin, function(req, res) {
    var idea = new Idea();
    var newIdea = {
        title: req.body.title,
        content: req.body.content
    };
    idea.create(newIdea, function() {
        res.redirect('/ideas');
    });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);