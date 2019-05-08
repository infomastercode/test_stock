var model = require(PATH_ROOT + '/models/v2/product.model');

exports.getProduct = function(id_product, callback) {
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

exports.editProduct = function(id_product, data, callback) {
	let error = null;

	if(!isset(id_product) || empty(id_product)){
		error = new Error('id product is missing!');
	}

	if(!isset(data.product_name) || empty(data.product_name)){
		error = new Error('product name is missing!');
	}

	if(!isnull(error)){
		callback(error, '');
	}

	//data.date_add = getdatetime();
	//data.date_upd = getdatetime();

    model.editProduct(id_product, data, callback);
}

exports.deleteProduct = function(id_product, callback) {
	let error = null;

	if(!isset(id_product) || empty(id_product)){
		error = new Error('id product is missing!');
	}

	if(!isnull(error)){
		callback(error, '');
	}

	//data.date_upd = getdatetime();
    model.deleteProduct(id_product, callback);
}