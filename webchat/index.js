var express = require('express');
var app = express();
var router = express.Router();
var port = process.env.PORT || 3700;

var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

//add user
router.route('/api/users')
  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function(req, res) {
      var user = new User();      // create a new instance of the User model
      user.firstName = req.body.firstName;  // set the user name (comes from the request)
      user.lastName = req.body.lastName; 
      // save the bear and check for errors
      user.save(function(err) {
          if (err)
              res.send(err);

          res.json({ message: 'User created!' });
      });
      
  })

//fetch all users 
.get(function(req, res) {
  User.find(function(err, users){
    if(err)
      res.send(err);

    res.json(users);
  })
})

router.route('/api/users/:userId')

.get(function(req, res){
  User.findById(req.params.userId, function(err, user){
    if(err)
      res.send(err);

    res.json(user);

  })
})

.put(function(req, res){
  User.findById(req.params.userId, function(err, user){
    if(err)
      res.send(err);

    user.firstName = req.body.firstName;  // set the user name (comes from the request)
    user.lastName = req.body.lastName; 
    // save the bear and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'User updated!' });
    });

  })
})

.delete(function(req, res){
  User.remove({
    _id: req.params.userId
  }, function(err, user){
    if(err)
      res.send(err);

    res.json({ message: 'User successfully deleted!' });

  })
})


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

//database connection
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/express'); 

var User     = require('./app/models/user');