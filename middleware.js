
var middleware = {
    requireAuthentication: function(req, res, next){
        console.log('private rout hit!')
        next();
    },
    logger: function(req, res, next) {
        
        console.log('Request ' + new Date().toString() + ': '+ req.method + ' ' + req.originalUrl);
        next();
    }
};

module.exports = middleware;