// *******************************************************
// expressjs template
//
// assumes: npm install express
// defaults to jade engine, install others as needed
//
// assumes these subfolders:
//   public/
//   public/javascripts/
//   public/stylesheets/
//   views/
//


var http = require("http");
var data = require('./data');
var app = require("./app")(data);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
})


//
// var express = require('express');
// var app = express();
// var AccountHandler = require('./handlers/AccountHandler');
// var ShoppingListHandler = require('./handlers/ShoppingListHandler');
// var routes = require('./Routes');
// var fs = require('fs');
//
// var expressLogFile = fs.createWriteStream('./logs/express.log', {flags: 'a'});
// // Configuration
// app.configure(function(){
//   app.use(express.logger({stream: expressLogFile}));
//   app.use(express.bodyParser());
//   app.use(express.methodOverride());
//   app.use(app.router);
//   app.use(express.static(__dirname + '/public'));
// });
// app.configure('development', function(){
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });
// app.configure('production', function(){
//   app.use(express.errorHandler());
// });
//
// var handlers = {
//   account: new AccountHandler(),
//   list: new ShoppingListHandler()
// };
//
// function start() {
//   routes.setup(app, handlers);
//   var port = process.env.PORT || 3000;
//   app.listen(port);
//   console.log("Express server listening on port %d in %s mode", port, app.settings.env);
// }
// // *******************************************************
// exports.start = start;
// exports.app = app;
