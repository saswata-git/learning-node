var User = require(__modelPath+'userModel');

module.exports = {
	Index : function(req, res) {
		res.send("You are in user controller");
	},

	Add : function(req, res) {
		var user = new User();      // create a new instance of the User model
		user.firstName = req.body.firstName;  // set the user name (comes from the request)
		user.lastName = req.body.lastName; 
		// save the bear and check for errors
		user.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'User created!' });
		});
	},	

	List : function(req, res) {
		User.find(function(err, users){
			if(err)
			  res.send(err);

			res.json(users);
		})
	},

	Edit : function(req, res){
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
	},

	Details : function(req, res) {
		User.findById(req.params.userId, function(err, user){
			if(err)
			  res.send(err);

			res.json(user);
		})
	},

	Delete : function(req, res){
		User.remove({
			_id: req.params.userId
		}, function(err, user){
			if(err)
			  res.send(err);

			res.json({ message: 'User successfully deleted!' });
		})
	}

}