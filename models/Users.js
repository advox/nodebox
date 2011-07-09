/**
 * Created at 09.07.11 22.18 by jesper
 */
var UserDBContext = require('../domain/Users');

var User = function() {
    return {
        authenticate: function(username, password, callback) {
            UserDBContext.find({username: username}, function(err, user) {
                if (err) {
                    callback(null);
                }
                if (user.password == password) {
                    callback(user);
                }
                callback(null);
            });
        },
        create: function(newUser, callback) {

            var user = new UserDBContext();
            user.find({username: newUser.username}, function(err, user) {
                if (user) {
                    var error = {
                        type: "user_exists"
                    };
                    callback(error);
                }
                else {
                    user.username = newUser.username;
                    user.password = newUser.password;
                    user.save(function(err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            callback();
                        }
                    });
                }
            });
        }
    };
};

exports = module.exports = User;