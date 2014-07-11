
/*
 * GET home page.
 */


var sizzle = require('../SizzleDoc');
var User = require('../schemas/user');
var crypto = require('crypto');

var generateID = function(name) {
  var rand = Math.floor(Math.random() * 10000);
  return (name + rand);
}

exports.register = function(req, res) {
  res.render('registration', {
    title: 'Signup for SizzleDoc'
  })
}

exports.create = function(req, res) {
  var email = req.param('email');
  var username = req.param('username');
  var id = generateID(username);
  console.log(id);

  var inputPassword = req.param('password');
  var sha256 = crypto.createHash('sha256');
  sha256.update(inputPassword, 'base64');
  var password = sha256.digest('base64');
  console.log(password);

  var record = new User({
    '_id': id,
    'email': email,
    'username': username,
    'password': password,
  })

  console.log(record);

  record.save(function(err){
    if(err){
      console.log(err);
      console.log('failed on saving');
      res.send({
        'url': '../Error',
        'message': 'Try Again Later'
      });
    } else {
      console.log('success');
      req.session.user = record;
      req.session.docs = record._docs;
      res.send({
        'email': email,
        'username': username,
        'password': (password && true),
        'url': '../welcome'
      });
    }
  })
}

exports.login = function(req, res) {
  var username = req.param('username');
  var inputPassword = req.param('password');
  var sha256 = crypto.createHash('sha256');
  sha256.update(inputPassword, 'base64');
  var password = sha256.digest('base64');
  console.log(password);

  var params = {
    'username': username,
    'password': password,
  }

  User.findOne(params, function(err, user){
    if(err){
      console.log('No such account');
      res.send({
        'url': '../Error'
      })
    } else {
      console.log("found account");
      req.session.user = user;
      req.session.docs = user._docs;
      res.send({
        'url': '../account',
        'user': username
      })
    }
  });
}

exports.welcome = function(req, res) {
  res.send({
    message: "Welcome to SizzleDocs, "+req.session.username,
    slogan: "Stop Getting Burned Now"
  })
}

exports.entry = function(req, res){
  res.render('login', {
    title: 'Log in to your SizzleDocs account',
  })
}

exports.account = function(req,res){
  var username = req.param('user');
  res.send({
    'message': 'you\'ve successfully logged in',
    'end': 'Welcome to SizzleDocs, '+ username,
  })
}
