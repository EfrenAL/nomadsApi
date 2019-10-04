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

app.get('/users', function(req, res){
    var query = req.query;
    var where = {};

    db.user.findAll({where: where}).then(function(users){
        res.send(users)
    }, function(){
        res.status(500).send();
    })


});


app.get('/user/:id', function(req, res){
    var userId = parseInt(req.params.id, 10);

    db.user.findByPk(userId).then(function(user){
        if(!!user){
            res.json(user.toJSON());
        } else {
            res.status(404).send()
        }
    }, function(e) {
        res.status(500).send();
    })

});

app.post('/user', function(req, res){
    var body = req.body;
    db.user.create(body).then(function(user){
        res.json(user.toJSON())
    }, function(e){
        res.status(400).json(e)
    });
});


app.use(express.static(__dirname + '/public'));

db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log('Express server started in port: ' + PORT)
    });
})



