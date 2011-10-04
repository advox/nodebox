/**
 * Created at 29.08.11 23.48 by jesper
 */
var User = require('../models/Users'),
    Resources = require('../resources/Resources');

var UserController = {
    authenticate: function(username, password, callback) {
        var user = new User();
        user.authenticate(username, password, function(user) {
            if (user) {
                callback(user);
            }
        });
    },
    create: function(req, res) {
        if (req.body.password != req.body.password2) {
            res.render('authentication/signup', {
                title: Resources.signup.header,
                isAuthenticated: true,
                error: {
                    type: 'error',
                    message: Resources.signup.password_mismatch
                }
            });
            return false;
        }
        
        var user = new User();
        var newUser = {
            username: req.body.username,
            password: req.body.password
        };
        user.create(newUser, function(err) {
            if (err) {
                if (err.type == 'user_exists') {
                    res.render('authentication/signup', {
                        title: Resources.signup.header,
                        isAuthenticated: true,
                        error: {
                            type: 'warning',
                            message: Resources.signup.user_exists
                        }
                    });
                }
            }
            else {
                res.redirect('/auth');
            }
        });
    }
};

exports = module.exports = UserController;