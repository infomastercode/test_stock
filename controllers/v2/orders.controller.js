var model = require(PATH_ROOT + '/models/v2/orders.model');

exports.getOrders = function(id_orders, callback) {
    model.getOrders(id_orders, callback);
}

exports.getOrdersForm = function(id_orders, callback) {
    model.getOrdersForm(id_orders, callback);
}

exports.addOrders = function(data, callback) {
    let error = null;

    // if(!isset(data.orders_name) || empty(data.orders_name)){
    // 	error = new Error('orders name error!');
    // }

    // if (!isnull(error)) {
    //     callback(error, '');
    // }

    // var temp = JSON.parse(JSON.stringify(data)); // clone object
    // delete temp.detail;

    // let master = temp;
    // let detail = data.detail;

    // data = {};
    // data.master = master;
    // data.master.active = 1;
    // data.master.date_add = getdatetime();
    // data.master.date_upd = getdatetime();
    // // detail
    // data.detail = detail;

    model.addOrders(data, callback);
}

exports.addOrdersDetail = function(data, callback) {
    let error = null;

    if(!isset(data.id_orders) || empty(data.id_orders)){
    	error = new Error('id orders is missing!');
    }

    if (!isnull(error)) {
        callback(error, '');
    }

    model.addOrdersDetail(data, callback);
}

exports.editOrders = function(data, callback) {
    let error = null;

    if (!isset(data.id_orders) || empty(data.id_orders)) {
        error = new Error('id orders is missing!');
    }

    if (!isset(data.orders_name) || empty(data.orders_name)) {
        error = new Error('orders name is missing!');
    }

    if (!isnull(error)) {
        callback(error, '');
    }

    //data.date_add = getdatetime();
    data.date_upd = getdatetime();

    model.editOrders(data, callback);
}

exports.deleteOrders = function(id_orders, data, callback) {
    let error = null;

    // if (!isset(data.id_orders) || empty(data.id_orders)) {
    //     error = new Error('id orders is missing!');
    // }

    if (!isnull(error)) {
        callback(error, '');
    }

    //data.date_upd = getdatetime();
    model.deleteOrders(id_orders, data, callback);
}