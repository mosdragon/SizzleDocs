var mongoose = require('mongoose');
var config = require('./config');

var connectionString = config.db.mongodb;

mongoose.connect(connectionString);

module.exports = mongoose.connection;
