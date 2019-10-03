var express = require('express');
var app = express();
var PORT = 3000;

var middleware = require('./middleware')

//We indicate the whole app to use middleware requireAuthentication
//app.use(middleware.requireAuthentication);
app.use(middleware.logger);


app.get('/', function(req, res){
    res.send('Hello biatch');
});

app.get('/about', middleware.requireAuthentication, function(req, res){
    res.send('About us');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function(){
    console.log('Express server started in port: ' + PORT)
});
