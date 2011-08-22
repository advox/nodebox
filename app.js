/**
 * Module dependencies.
 */

var express = require('express'),
    app = module.exports = express.createServer(),
    publicDir = __dirname + '/public',
    isAuthenticated = false;

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

// Functions
function requiresLogin(req, res, next) {
    if (req.session.user) {
        isAuthenticated = true;
        next();
    }
    else {
        res.redirect('/auth?redir=' + req.url);
    }
}

// DB Stuff
var Idea = require('./models/Ideas');
var User = require('./models/Users');

// Controllers
var AuthController = require('./controllers/AuthController');

// Routes

app.get('/', function(req, res) {
    res.render('index', {
        locals: {
            title: 'nodebox - Home',
            'isAuthenticated?': isAuthenticated
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

app.post('/auth/login', function(req, res) {
    var user = new User();
    user.authenticate(req.body.username, req.body.password, function(user) {
        if (user) {
            req.session.user = user;
            res.redirect(req.query.redir || '/');
        }
        else {
            res.render('authentication/index', {
                locals: {
                    title: "Login failed"
                }
            });
        }
    })
});

app.get('/auth/signup', function(req, res) {
    res.render('authentication/signup');
});

app.post('/auth/signup', function(req, res) {
    AuthController.signup(req, res);
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