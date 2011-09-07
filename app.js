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
    app.set('view engine', 'ejs');
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

// Controllers
var IdeaController = require('./controllers/IdeaController');
var UserController = require('./controllers/UserController');

// Routes

app.get('/', function(req, res) {
    res.render('index', {
        locals: {
            title: 'nodebox - Home',
            isAuthenticated: isAuthenticated
        }
    });
});

/*
 Authentication
 */

app.get('/auth', function(req, res) {
    res.render('authentication/index', {
        title: "Login",
        isAuthenticated: isAuthenticated
    });
});

app.post('/auth/login', function(req, res) {
    UserController.authenticate(req.body.username, req.body.password, function(user) {
        console.log(user);
        if (user) {
            req.session.user = user;
            res.redirect(req.query.redir || '/');
        }
        else {
            res.render('authentication/index', {
                title: "Login failed",
                isAuthenticated: isAuthenticated
            });
        }
    });
});

app.get('/auth/signup', function(req, res) {
    res.render('authentication/signup', {
        title: "Sign up for an account!",
        isAuthenticated: isAuthenticated
    });
});

app.post('/auth/signup', function(req, res) {
    UserController.create(req, res);
});

/*
 * Ideas
 */

app.get('/ideas', requiresLogin, function(req, res) {
    IdeaController.findAll(function(error, ideas) {
        res.render('idea/index', {
            title: "Ideas",
            isAuthenticated: isAuthenticated,
            ideas: ideas
        });
    });
});

app.get('/idea/create', requiresLogin, function(req, res) {
    res.render('idea/create', {
        title: "Create new idea",
        isAuthenticated: isAuthenticated
    });
});

app.post('/idea/create', requiresLogin, function(req, res) {
    IdeaController.create(req, res);
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);