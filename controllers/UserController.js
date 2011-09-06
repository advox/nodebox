/**
 * Created at 29.08.11 23.48 by jesper
 */
var User = require('../models/Users');

var UserController = {
    authenticate: function(username, password, success) {
        var user = new User();
        user.authenticate(username, password, function(user) {
            if(user) {
                success(user);
            }
        });
    },
    create: function(req, res) {
        if (req.body.password != req.body.password2) {
            res.render('authentication/signup', {
                locals: {
                    error: {
                        message: "The passwords didn't match"
                    }
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
                        locals: {
                            error:{
                                message: "A user with that name already exists, please choose another one"
                            }
                        }
                    });
                    return false;
                }
            }
            else {
                res.redirect('/ideas');
            }
        });
    }
};

exports = module.exports = UserController;