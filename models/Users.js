/**
 * Created at 09.07.11 22.18 by jesper
 */
var UserDBContext = require('../domain/Users');

var User = function() {
    return {
        authenticate: function(username, password, callback) {
            UserDBContext.findOne({username: username}, function(err, user) {
                if (err) {
                    callback(null);
                    return;
                }
                if (user != null) {
                    if (user.password == password) {
                        callback(user);
                        return;
                    }
                }
                callback(null);
            });
        },
        create: function(newUser, callback) {
            console.log(newUser);
            UserDBContext.find({username: newUser.username}, function(err, existingUser) {
                if (existingUser) {
                    var error = {
                        type: "user_exists"
                    };
                    callback(error);
                    return false;
                }
                else {
                    var user = new UserDBContext();
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
        },
        update: function(username, updates, callback) {
            UserDBContext.findOne({username: user}, function(err, user) {
                if (updates.password) {
                    user.password = updates.password;
                }
                if (updates.firstName) {
                    user.firstName = updates.firstName;
                }
                if (updates.lastName) {
                    user.lastName = updates.lastName;
                }
                if (updates.email) {
                    user.email = updates.email;
                }
            });
        }
    };
};

exports = module.exports = User;