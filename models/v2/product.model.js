var db = require(PATH_ROOT + '/config/database');

module.exports.getProduct = async function(id_product, callback) {
    let sql = "";
    if (!empty(id_product)) {
        sql = "CALL SP_PRODUCT_GET(@s, @m, 'BY_ID', " + id_product + ");";
    } else {
        sql = "CALL SP_PRODUCT_GET(@s, @m, 'ALL', null);";
    }
    let conn = await db.getPool().getConnection();
    let res = await conn.query(sql);
    if (conn) conn.end();
    let data = {};
    if (isset(res[0])) {
        data = { data: res[0] };
    }
    callback(null, data);
}

module.exports.addProduct = async function(data, callback) {
    let sql = "CALL SP_PRODUCT_POST(@s, @m, 'ADD', null, '" + data.reference + "', '" + data.product_name + "', ";
    sql += " '" + data.ean + "', '" + data.sku + "', '" + data.unit + "', '" + data.unit_cost + "', '" + data.unit_price + "' ) ";
    let conn = await db.getPool().getConnection();
    let res = await conn.query(sql);
    if (conn) conn.end();
    let result = {};
    if (isset(res.affectedRows) && res.affectedRows == 1) {
        result = { status: 'S', message: 'add product success' };
    }
    callback(null, result);
}

module.exports.editProduct = async function(id_product, data, callback) {
    let sql = "CALL SP_PRODUCT_POST(@s, @m, 'EDIT', " + id_product + ", '" + data.reference + "', '" + data.product_name + "', ";
    sql += " '" + data.ean + "', '" + data.sku + "', '" + data.unit + "', '" + data.unit_cost + "', '" + data.unit_price + "' ) ";
    let conn = await db.getPool().getConnection();
    let res = await conn.query(sql);
    if (conn) conn.end();
    let result = {};
    if (isset(res.affectedRows) && res.affectedRows == 1) {
        result = { status: 'S', message: 'update product success' };
    }
    callback(null, result);
}

module.exports.deleteProduct = async function(id_product, callback) {
    let sql = "CALL SP_PRODUCT_POST(@s, @m, 'DELETE', " + id_product + ", null, null, null, null, null, null, null ) ";
    logger(sql);
    let conn = await db.getPool().getConnection();
    let res = await conn.query(sql);
    if (conn) conn.end();
    let result = {};
    if (isset(res.affectedRows) && res.affectedRows == 1) {
        result = { status: 'S', message: 'delete product success' };
    }
    callback(null, result);
}
