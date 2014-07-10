var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var db = require('../db')

var Doc = new Schema({
  _user: {type: String, index: true, ref: 'User'},
  content: String,
  created: {type:Date, index:true, default: new Date()},
  lastModified: {type: Date, index: true},
  tags: {type: Array, unique: true},
  title: {type: String, index:true},
});

autoIncrement.initialize(db);
Doc.plugin(autoIncrement.plugin, 'Document');

Doc.methods.getTitle = function() {
  return this.title;
}

Doc.methods.getContent = function() {
	return this.content;
}

Doc.methods.getUser = function() {
	return this._user;
}

Doc.methods.getUserName = function() {
	return this._user.username;
}

Doc.methods.getDateCreated = function(){
  return this.created;
}

Doc.methods.getDateModified = function(){
  return this.lastModified;
}

var docModel = mongoose.model('Doc', Doc);

module.exports = docModel;
