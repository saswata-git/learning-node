
var userController = require(__dirname+'/app/models/userController');
var homeController = require(__dirname+'/app/models/homeController');

module.exports = function(app, router, userModel) {
	
	router.use(function (req,res,next) {
	  console.log("/" + req.method);
	  next();
	});

	router.get("/", homeController.index);
	router.get("/about", homeController.about);
	router.get("/contact", homeController.contact);

	//add user
	router.route('/api/users')
	  // create a bear (accessed at POST http://localhost:8080/api/bears)
	  .post(function(req, res) {
	      var user = new userModel();      // create a new instance of the User model
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
	  userModel.find(function(err, users){
	    if(err)
	      res.send(err);

	    res.json(users);
	  })
	})

	router.route('/api/users/:userId')

	.get(function(req, res){
	  userModel.findById(req.params.userId, function(err, user){
	    if(err)
	      res.send(err);

	    res.json(user);

	  })
	})

	.put(function(req, res){
	  userModel.findById(req.params.userId, function(err, user){
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
	  userModel.remove({
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
}