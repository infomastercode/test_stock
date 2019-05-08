var model = require('./../models/product.model');

exports.getProduct = function(data, callback) {
	let id_product = data;

    model.getProduct(id_product, callback);
}

exports.addProduct = function(data, callback) {
	let error = null;

	if(!isset(data.product_name) || empty(data.product_name)){
		error = new Error('product name error!');
	}

	if(!isnull(error)){
		callback(error, '');
	}

	data.date_add = getdatetime();
	data.date_upd = getdatetime();

    model.addProduct(data, callback);
}

exports.editProduct = function(data, callback) {
	let error = null;

	if(!isset(data.id_product) || empty(data.id_product)){
		error = new Error('id product is missing!');
	}

	if(!isset(data.product_name) || empty(data.product_name)){
		error = new Error('product name is missing!');
	}

	if(!isnull(error)){
		callback(error, '');
	}

	//data.date_add = getdatetime();
	data.date_upd = getdatetime();

    model.editProduct(data, callback);
}

exports.deleteProduct = function(data, callback) {
	let error = null;

	if(!isset(data.id_product) || empty(data.id_product)){
		error = new Error('id product is missing!');
	}

	if(!isnull(error)){
		callback(error, '');
	}

	data.date_upd = getdatetime();
    model.deleteProduct(data, callback);
}