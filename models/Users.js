/**
 * Created at 09.07.11 22.18 by jesper
 */
var config = require('../config.js'), hash = require('node_hash'), saltgen = require(__dirname + '/../helpers/saltgen'), Sequelize = require('sequelize'), db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host:config.db.host,
    port:config.db.port
}), UserDB = db.import(__dirname + '/../domain/Users');

var User = {
    authenticate:function(username, password, callback) {
        UserDB.find({ where:{username:username}}).on('success', function(user) {
            if (user.salt) {
                var hashed_password = hash.sha256(password, user.salt);
                if (user.password == hashed_password) {
                    callback(user);
                }
            }
        });
    },
    create:function(newUser, callback) {
        UserDB.count({where:['username = ?', newUser.username ]}).on('success', function(count) {
            if (count <= 0) {
                var salt = saltgen(40);
                var hashed_password = hash.sha256(newUser.password, salt);
                var user = UserDB.build({
                    username:newUser.username,
                    password:hashed_password,
                    salt:salt
                });
                user.save().on('success', function() {
                    callback();
                });
            } else {
                var error = {
                    type:'user_exists'
                };
                callback(error);
                return false;
            }
        });
    },
    update:function(username, updates, callback) {
        UserDB.find({ where:{ username:user }}).on('success', function(user) {
            user.updateAttributes(updates).on('success', function(updatedUser) {
                callback(updatedUser);
            });
        });
    }
};

exports = module.exports = User;