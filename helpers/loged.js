module.exports = {
    loged: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }

        res.redirect('/log')
    }
}