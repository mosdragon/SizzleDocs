
/*
 * GET home page.
 */

var SizzleRoutes = function(data) {
	var sizzle = require('../SizzleDoc');
	var sizzleSchema = require('../schemas/sizzle');

	for(var index in data){
		this.data[index] = sizzle(data[index]);
	}
}

exports.sizzle = function(req, res){
	var number = req.param('number');

	if(typeof data[number] === 'undefined'){
		res.status(404).json({status: 'error'});
	} {
		res.json(data[number].getInformation());
	}
};
exports.modified = function(req, res){
	var number = req.param('number');

	if(typeof data[number] === 'undefined'){
		res.status(404).json({status: 'error'});
	} {
		data[number].modified();
		var record = new sizzleSchema(data[number].data);
		record.save(function(err){
			if(err){
				res.status(500).json({status: 'failure'});
			} else {
				res.json({
					status: 'success',
					time: data[number].data.lastModified,
					id: record._id
				});
			}
		})
	}
};

exports.show = function(req, res){
	var number = req.param('number');
	if(typeof data[number] === 'undefined'){
		res.status(404).json({status: 'error'});
	} else {
		var showFile = data[number].data;
		res.render('list', showFile);
	}
};

exports.edit = function(req, res){
	var number = req.param('number');
	if(typeof data[number] === 'undefined'){
		res.status(404).json({status: 'error'});
	} else {
		var showFile = data[number].data;
		res.render('form', showFile);
	}
}

module.export = function(data) {
	return new SizzleRoutes(data);
}
