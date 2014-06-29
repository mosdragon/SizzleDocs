var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sizzle');

module.exports = mongoose.connection;