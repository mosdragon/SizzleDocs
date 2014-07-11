var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var User = new Schema({
  _docs: {type: [{type: Number, ref: 'Doc'}], default: []},
  _id: {type: String, index:true, unique: true},
  created: {type: Date, index: true, default: new Date()},
  deleted: {type: Boolean, default: false},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  username: {type: String, unique: true, required: true},
});

User.methods.getUsername = function() {
  return this.username;
}

User.methods.getEmailAddress = function() {
  return this.emailAddress;
}

User.methods.getId = function() {
  return this._id;
}

User.methods.getDateCreated = function(){
  return this.created;
}

var userModel = mongoose.model('User', User);

module.exports = userModel;
