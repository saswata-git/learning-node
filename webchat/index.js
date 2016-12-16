var express = require('express');
var app = express();
var router = express.Router();
var port = 3700;

app.set('views', __dirname+'/template');
app.set('view engine', "ejs");
app.engine('html', require('ejs').renderFile);


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.render("index.html");
});

router.get("/about",function(req,res){
  res.render("about.html");
});

router.get("/contact",function(req,res){
  res.render("contact.html");
});

app.use("/",router);

app.use("*",function(req,res){
  res.render("404.html");
});




// app.get("/", function(req, res){
//     res.render("page.html");
// });

app.use(express.static(__dirname+'/assets'));

var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);


io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});