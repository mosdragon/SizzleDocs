var mongoose = require('mongoose');
var ObjectID = mongoose.ObjectID;

var sizzleSchema = new mongoose.Schema({
  title: {type: String, index:true},
  content: String,
  created: Date,
  lastModified: Date,
  tags: {type: Array, unique: true},
  docNumber: {type: Number, unique: true, index: true},
  _user: {type:String, index: true}
});

sizzleSchema.methods.getTitle = function() {
  return this.title;
}

sizzleSchema.methods.getContent = function() {
	return this.content;
}

sizzleSchema.methods.getUser = function() {
	return this._user;
}

sizzleSchema.methods.getUserName = function() {
	return this._user.name;
}

sizzleSchema.methods.getDateCreated = function(){
  return this.created;
}

sizzleSchema.methods.getDateModified = function(){
  return this.lastModified;
}

sizzleSchema.methods.getData = function(){
  return this.data;
}

var sizzleModel = mongoose.model('Document', sizzleSchema);

module.exports = sizzleModel;
