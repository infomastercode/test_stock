var model = require('./../models/purchase.model');

exports.getPurchase = function(data, callback) {
    let id_purchase = data;

    model.getPurchase(id_purchase, callback);
}

exports.addPurchase = function(data, callback) {
    let error = null;

    // if(!isset(data.purchase_name) || empty(data.purchase_name)){
    // 	error = new Error('purchase name error!');
    // }

    if (!isnull(error)) {
        callback(error, '');
    }

    var temp = JSON.parse(JSON.stringify(data)); // clone object
    delete temp.detail;

    let master = temp;
    let detail = data.detail;

    data = {};
    data.master = master;
    data.master.active = 1;
    data.master.date_add = getdatetime();
    data.master.date_upd = getdatetime();
    // detail
    data.detail = detail;

    model.addPurchase(data, callback);
}

exports.addPurchaseDetail = function(data, callback) {
    let error = null;

    if(!isset(data.id_purchase) || empty(data.id_purchase)){
    	error = new Error('id purchase is missing!');
    }

    if (!isnull(error)) {
        callback(error, '');
    }

    model.addPurchaseDetail(data, callback);
}

exports.editPurchase = function(data, callback) {
    let error = null;

    if (!isset(data.id_purchase) || empty(data.id_purchase)) {
        error = new Error('id purchase is missing!');
    }

    if (!isset(data.purchase_name) || empty(data.purchase_name)) {
        error = new Error('purchase name is missing!');
    }

    if (!isnull(error)) {
        callback(error, '');
    }

    //data.date_add = getdatetime();
    data.date_upd = getdatetime();

    model.editPurchase(data, callback);
}

exports.deletePurchase = function(data, callback) {
    let error = null;

    if (!isset(data.id_purchase) || empty(data.id_purchase)) {
        error = new Error('id purchase is missing!');
    }

    if (!isnull(error)) {
        callback(error, '');
    }

    data.date_upd = getdatetime();
    model.deletePurchase(data, callback);
}