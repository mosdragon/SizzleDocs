
/*
 * GET home page.
 */

var DocRoutes = function(data) {
	var sizzle = require('../SizzleDoc');
	var sizzleSchema = require('../app/models/docs');

	for(var index in data){
		this.data[index] = sizzle(data[index]);
	}
}

DocRoutes.prototype.sizzle = function(req, res){
	var number = req.param('number');

	if(typeof data[number] === 'undefined'){
		res.status(404).json({status: 'error'});
	} {
		res.json(data[number].getInformation());
	}
};
DocRoutes.prototype.modified = function(req, res){
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

DocRoutes.prototype.show = function(req, res){
	var number = req.param('number');
	if(typeof data[number] === 'undefined'){
		res.status(404).json({status: 'error'});
	} else {
		var showFile = data[number].data;
		res.render('list', showFile);
	}
};

DocRoutes.prototype.edit = function(req, res){
	var number = req.param('number');
	if(typeof data[number] === 'undefined'){
		res.status(404).json({status: 'error'});
	} else {
		var showFile = data[number].data;
		res.render('form', showFile);
	}
}

module.exports = function(data) {
	return new DocRoutes(data);
}
