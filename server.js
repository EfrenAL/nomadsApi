var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var _ = require('underscore')
var db = require('./db.js')
var middleware = require('./middleware');

//We indicate the whole app to use middleware requireAuthentication
//app.use(middleware.requireAuthentication);
app.use(middleware.logger);
app.use(bodyParser.json());


app.get('/', function(req, res){
    res.send('Hello biatch');
});

app.get('/user', middleware.requireAuthentication, function(req, res){
    
});

app.post('/user', function(req, res){
    var body = req.body;
    db.user.create(body).then(function(user){
        res.json(user.toJSON())
    }, function(e){
        res.status(400).json(e)
    });


})


app.use(express.static(__dirname + '/public'));

db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log('Express server started in port: ' + PORT)
    });
})



