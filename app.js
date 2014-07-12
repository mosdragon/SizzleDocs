
/**
 * Module dependencies.
 */

module.exports = function(data, routers, db){
  var express = require('express');
  var path = require('path');
  var app = express();
  var config = require('./config');
  var MongoStore = require('connect-mongo')(express);
  var passport = require('./auth');

  // all environments
  app.set('port', config.port || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'ComeToBrasil',
    store: new MongoStore({
      mongoose_connection: db
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(function(req,res,next){
    req.db = db;
    next();
  });

  app.use(function(req, res, next){
    res.set('X-Powered-By', 'NodePad');
    next();
  });

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  /// catch 404 and forward to error handler
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  // development only
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  var userRoutes = routers.users;
  var docRoutes = routers.docs;

  app.get('/account/:user', userRoutes.account);
  app.get('/docs/:number', docRoutes.sizzle);
  app.get('/docs/:number/edit', docRoutes.edit);
  app.get('/docs/:number/show', docRoutes.show);
  app.get('/login', userRoutes.entry);
  app.get('/registration', userRoutes.register);
  app.get('/welcome', userRoutes.welcome);
  app.post('/create', userRoutes.create);
  // app.post('/login', userRoutes.login);
  app.post('/login', passport.authenticate('local',{
    failureRedirect: '/login',
    successRedirect: '/account/:user'
  }));
  app.put('/docs/:number/modified', docRoutes.modified);

  return app;
};
