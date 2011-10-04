/**
 * Module dependencies.
 */

var express = require('express'),
    app = module.exports = express.createServer(),
    Mappings = require(__dirname + '/mappings/Mappings'),
    Resources = require(__dirname + '/resources/Resources'),
    publicDir = __dirname + '/public',
    isAuthenticated = false;


Mappings.map();
Mappings.sync();

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
var IdeaController = require(__dirname + '/controllers/IdeaController'),
    UserController = require(__dirname + '/controllers/UserController'),
    ProjectController = require(__dirname + '/controllers/ProjectController');

// Routes

app.get('/', function(req, res) {
    res.render('index', {
        title: 'nodebox - Home',
        isAuthenticated: isAuthenticated
    });
});

/*
 Authentication
 */

app.get('/auth', function(req, res) {
    console.log(req.statusCode);

    res.render('authentication/index', {
        title: Resources.login.header,
        isAuthenticated: isAuthenticated
    });
});

app.post('/auth/login', function(req, res) {
    UserController.authenticate(req.body.username, req.body.password, function(user) {
        if (user) {
            req.session.user = {
                id: user.id,
                username: user.username
            };
            res.redirect(req.query.redir || '/');
        } else {
            res.redirect('/auth', 401);
        }
    });
});

app.get('/auth/signup', function(req, res) {
    res.render('authentication/signup', {
        title: Resources.signup.header,
        isAuthenticated: isAuthenticated
    });
});

app.post('/auth/signup', function(req, res) {
    UserController.create(req, res);
});

app.get('/auth/signout', function(req, res) {
    req.session.user = null;
    isAuthenticated = false;
    res.redirect('/');
});

/*
 * Projects
 */

app.get('/projects', requiresLogin, function(req, res) {
    ProjectController.findAll(function(projects) {
        res.render('project/index', {
            title: 'Projects',
            isAuthenticated: isAuthenticated,
            projects: projects
        })
    });
});

app.get('/project/create', requiresLogin, function(req, res) {
    res.render('project/create', {
        title: 'Create a new project',
        isAuthenticated: isAuthenticated
    });
});

app.post('/project/create', requiresLogin, function(req, res) {
    ProjectController.create(req, res);
});

app.get('/project/:id', requiresLogin, function(req, res) {
    var ideas;

    IdeaController.findAll(function(i){
       ideas = i;
    });
    ProjectController.find(req.params.id, function(project){
        res.render('project/detail', {
            title: "Project details for " + project.title,
            isAuthenticated: isAuthenticated,
            project: project,
            ideas: ideas
        });
    })
});

/*
 * Ideas
 */

app.get('/ideas', requiresLogin, function(req, res) {
    IdeaController.findAll(function(ideas) {
        res.render('idea/index', {
            title: 'Ideas',
            isAuthenticated: isAuthenticated,
            ideas: ideas
        });
    });
});

app.get('/idea/create', requiresLogin, function(req, res) {
    ProjectController.findAll(function(projects) {
        res.render('idea/create', {
            title: 'Create new idea',
            isAuthenticated: isAuthenticated,
            projects: projects
        });
    });

});

app.post('/idea/create', requiresLogin, function(req, res) {
    IdeaController.create(req, res);
});

app.listen(3000);
console.log('Express server listening on port %d in %s mode', app.address().port, app.settings.env);