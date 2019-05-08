var db = require(PATH_ROOT + '/config/database');

module.exports.getLocation = async function(id_location, callback) {
    if (!empty(id_location)) {
        sql = "CALL SP_LOCATION(@s, @m, 'GET_BY_ID', " + id_location + ", null, null, null);";
    } else {
        sql = "CALL SP_LOCATION(@s, @m, 'GET_ALL', null, null, null, null);";
    }
    let res = await db.query(sql);
    let data = {};
    if (isset(res[0])) {
        data = { data: res[0] };
    }
    callback(null, data);
}

module.exports.addLocation = async function(data, callback) {
    let sql = "CALL SP_LOCATION(@s, @m, 'ADD', null, '" + data.zone + "', '" + data.location + "', '" + data.type + "')";
    let res = await db.query(sql);
    let result = {};
    if (isset(res.affectedRows) && res.affectedRows == 1) {
        result = { status: 'S', message: 'add location success' };
    }
    callback(null, result);
}

module.exports.editLocation = async function(id_location, data, callback) {
    let sql = "CALL SP_LOCATION(@s, @m, 'EDIT', " + id_location + ", '" + data.zone + "', '" + data.location + "', '" + data.type + "')";
    let res = await db.query(sql);
    let result = {};
    if (isset(res.affectedRows) && res.affectedRows == 1) {
        result = { status: 'S', message: 'update location success' };
    }
    callback(null, result);
}

module.exports.deleteLocation = async function(id_location, callback) {
    let sql = "CALL SP_LOCATION(@s, @m, 'DELETE', " + id_location + ", null, null, null);";
    let res = await db.query(sql);
    let result = {};
    if (isset(res.affectedRows) && res.affectedRows == 1) {
        result = { status: 'S', message: 'delete location success' };
    }
    callback(null, result);
}