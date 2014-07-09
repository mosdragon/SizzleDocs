var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var Sizzle = new Schema({
  _user: {type: String, index: true, ref: 'User'}
  content: String,
  created: {type:Date, index:true, default: new Date()},
  lastModified: {type: Date, index: true},
  tags: {type: Array, unique: true},
  title: {type: String, index:true},
});

Sizzle.plugin(autoIncrement.plugin, 'Document');

Sizzle.methods.getTitle = function() {
  return this.title;
}

Sizzle.methods.getContent = function() {
	return this.content;
}

Sizzle.methods.getUser = function() {
	return this._user;
}

Sizzle.methods.getUserName = function() {
	return this._user.username;
}

Sizzle.methods.getDateCreated = function(){
  return this.created;
}

Sizzle.methods.getDateModified = function(){
  return this.lastModified;
}

var sizzleModel = mongoose.model('Document', Sizzle);

module.exports = sizzleModel;
