var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Sizzle = new Schema({
  title: {type: String, index:true},
  content: String,
  created: Date,
  lastModified: Date,
  tags: {type: Array, unique: true},
  idNumber: {type: Number, index: true},
  _user: {type: ObjectId, index: true, ref: 'User'}
});

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

Sizzle.methods.getData = function(){
  return this.data;
}

var sizzleModel = mongoose.model('Document', Sizzle);

module.exports = sizzleModel;
