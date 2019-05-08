var model = require('./../models/stock.model');

exports.getStock = function(data, callback) {
	let id_stock = data;

    model.getStock(id_stock, callback);
}

exports.addStock = function(data, callback) {
	let error = null;

	if(!isset(data.id_product) || empty(data.id_product)){
		error = new Error('id product is missing!');
	}

	if(!isset(data.id_location) || empty(data.id_location)){
		error = new Error('id location is missing!');
	}

	if(!isset(data.qty) || empty(data.qty)){
		error = new Error('qty is missing!');
	}

	if(!isnull(error)){
		callback(error, '');
	}

	//data.active = 1;
	data.date_add = getdatetime();
	data.date_upd = getdatetime();

    model.addStock(data, callback);
}

// exports.editStock = function(data, callback) {
// 	let error = null;

// 	if(!isset(data.id_stock) || empty(data.id_stock)){
// 		error = new Error('id stock is missing!');
// 	}

// 	if(!isset(data.stock) || empty(data.stock)){
// 		error = new Error('stock name is missing!');
// 	}

// 	if(!isnull(error)){
// 		callback(error, '');
// 	}

// 	//data.active = 1;
// 	//data.date_add = getdatetime();
// 	data.date_upd = getdatetime();

//     model.editStock(data, callback);
// }

// exports.deleteStock = function(data, callback) {
// 	let error = null;

// 	if(!isset(data.id_stock) || empty(data.id_stock)){
// 		error = new Error('id stock is missing!');
// 	}

// 	if(!isnull(error)){
// 		callback(error, '');
// 	}

// 	data.date_upd = getdatetime();
//     model.deleteStock(data, callback);
// }