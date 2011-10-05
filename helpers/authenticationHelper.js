function requiresLogin( req, res, next) {
    if ( req.session.user ) {
        isAuthenticated = true;
        next();
    }
    else {
        isAuthenticated = false;
        res.redirect('/auth?redir=' + req.url);
    }
}

exports = module.exports = requiresLogin;