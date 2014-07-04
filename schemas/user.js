var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var User = new Schema({
  username: {type: String, index: true, unique: true, required: true},
  email: {type: String, index: true, unique: true, required: true},
  password: {type: String, required: true},
  numberOfDocuments: {type: Number, default: 0},
  docs: {type: [ObjectId], default: []},
  created: {type: Date, index: true},
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
