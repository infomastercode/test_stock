var model = require('./../models/location.model');

exports.getLocation = function(data, callback) {
	let id_location = data;

    model.getLocation(id_location, callback);
}

exports.addLocation = function(data, callback) {
	let error = null;

	if(!isset(data.location) || empty(data.location)){
		error = new Error('location is missing!');
	}

	if(!isnull(error)){
		callback(error, '');
	}

	data.active = 1;
	data.date_add = getdatetime();
	data.date_upd = getdatetime();

    model.addLocation(data, callback);
}

exports.editLocation = function(data, callback) {
	let error = null;

	if(!isset(data.id_location) || empty(data.id_location)){
		error = new Error('id location is missing!');
	}

	if(!isset(data.location) || empty(data.location)){
		error = new Error('location name is missing!');
	}

	if(!isnull(error)){
		callback(error, '');
	}

	//data.active = 1;
	//data.date_add = getdatetime();
	data.date_upd = getdatetime();

    model.editLocation(data, callback);
}

exports.deleteLocation = function(data, callback) {
	let error = null;

	if(!isset(data.id_location) || empty(data.id_location)){
		error = new Error('id location is missing!');
	}

	if(!isnull(error)){
		callback(error, '');
	}

	data.date_upd = getdatetime();
    model.deleteLocation(data, callback);
}