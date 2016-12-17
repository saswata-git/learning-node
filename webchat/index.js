var express = require('express');
var app = express();
var router = express.Router();
var mongoose   = require('mongoose');
var port = process.env.PORT || 3700;
var bodyParser = require('body-parser');

// config files
var db = require('./config/db');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', __dirname+'/template');
app.set('view engine', "ejs");
app.engine('html', require('ejs').renderFile);


var User     = require('./app/models/user');

// routes ==================================================
require('./app/routes')(app, router, User); // pass our application into our routes

app.use(express.static(__dirname+'/assets'));

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