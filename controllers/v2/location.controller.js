var model = require(PATH_ROOT + '/models/v2/location.model');

exports.getLocation = function(id_location, callback) {
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

exports.editLocation = function(id_location, data, callback) {
	let error = null;

	if(!isset(id_location) || empty(id_location)){
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
	//data.date_upd = getdatetime();

    model.editLocation(id_location, data, callback);
}

exports.deleteLocation = function(id_location, callback) {
	let error = null;

	if(!isset(id_location) || empty(id_location)){
		error = new Error('id location is missing!');
	}

	if(!isnull(error)){
		callback(error, '');
	}

	//data.date_upd = getdatetime();
    model.deleteLocation(id_location, callback);
}