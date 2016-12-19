module.exports = function(app) {
  // Install a `/` route that returns server status
  // var router = server.loopback.Router();
  // router.get('/', server.loopback.status());
  // server.use(router);

  app.get('/ping', function(req, res) {
    res.send('pong');
  });
};
