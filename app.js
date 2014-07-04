
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var db = require('./db');

var docRoutes = require('./routes/docs');
var userRoutes = require('./routes/users');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
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

// app.get('/', docRoutes.index);
app.get('/docs/:number', docRoutes.sizzle);
app.get('/docs/:number/show', docRoutes.show);
app.get('/docs/:number/edit', docRoutes.edit);
app.get('/registration', userRoutes.register);

app.post('/create', userRoutes.create);
app.get('/welcome', userRoutes.welcome);
app.get('/account/:user', userRoutes.account);

app.post('/login', userRoutes.login);

app.get('/login', userRoutes.entry);

app.put('/docs/:number/modified', docRoutes.modified);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
