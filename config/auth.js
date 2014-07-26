var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

passport.use(new LocalStrategy(
  function(username, password, done){
    var query = {
      'username': username,
      'password': password
    };
    User.findOne(query).exec(function(err, user){
      if(err){
      	return done(null, false);
      } else {
      	return done(null, user);
      }
    });
  }
));

passport.serializeUser(function(user, done){
	done(null, user.username);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user);
	});
});

module.exports = passport;
