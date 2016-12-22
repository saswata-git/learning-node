var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8000;
var bodyParser = require('body-parser');
var path = require('path');

global.__rootPath = path.resolve(__dirname)+'/';
global.__appPath = path.resolve(__dirname)+'/app/';
global.__configPath = path.resolve(__dirname)+'/app/config/';
global.__assetPath = path.resolve(__dirname)+'/assets/';
global.__controllerPath = path.resolve(__dirname)+'/app/controllers/';
global.__modelPath = path.resolve(__dirname)+'/app/models/';
global.__viewPath = path.resolve(__dirname)+'/app/views/';

// config files
var db = require(__configPath+'/Database');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', __viewPath);
app.set('view engine', "ejs");
app.engine('html', require('ejs').renderFile);

//var userModel = require('./app/models/userModel');

// routes ==================================================
require(__configPath+'Router')(app); 
//var apiRouter = require(__configPath+'APIRouter'); // pass our application into our routes
app.use(express.static(__assetPath));

var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);


io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

//database connection
mongoose.connect(db.url); 
exports = module.exports = app;             // expose app