/**
 * Created at 22.08.11 23.14 by jesper
 */
var AuthController = {
    signup: function(req, res) {
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

exports = module.exports = AuthController;