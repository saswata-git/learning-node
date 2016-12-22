
var user = require(__controllerPath+'userController');

module.exports = function(app) {	
	app.use(function(req, res, next) {
	  console.log("/" + req.method);
	  next();
	})

	app.get("/",function(req,res){
	  res.render("index.html");
	});

	app.get("/about",function(req,res){
	  res.render("about.html");
	});

	app.get("/contact",function(req,res){
	  res.render("contact.html");
	});

	//user module start here
	app.post('/api/user', user.Add);
	app.get('/api/user/:userId', user.Details);
	app.get('/api/user', user.List);
	app.put('/api/user/:userId', user.Edit);
	app.delete('/api/user/:userId', user.Delete);
	
	app.use("*",function(req,res){
	  res.render("404.html");
	});


}