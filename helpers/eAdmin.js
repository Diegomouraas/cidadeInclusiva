module.exports = {
    eAdmin: function(req, res, next) {
        if(req.isAuthenticated() && req.user[0].eAdmin == 1){
            
            return next();
        }

        res.redirect('/log')
    }
}