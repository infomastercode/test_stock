var db = require(PATH_ROOT + '/config/database');

module.exports.getOrders = async function(id_orders, callback) {
    if (!empty(id_orders)) {
        sql = "CALL SP_ORDERS(@s, @m, 'GET_BY_ID', " + id_orders + ", null, null, null, null, null, null, null, null, null, null);";
    } else {
        sql = "CALL SP_ORDERS(@s, @m, 'GET_ALL', null, null, null, null, null, null, null, null, null, null, null);";
    }
    let res = await db.query(sql);
    let data = {};
    if (isset(res[0])) {
        data = { data: res[0] };
    }
    callback(null, data);
}

module.exports.getOrdersForm = async function(id_orders, callback) {
    let sql = "CALL SP_ORDERS(@s, @m, 'GET_BY_ID', " + id_orders + ", null, null, null, null, null, null, null, null, null, null);";
    let res = await db.query(sql);
    let master = '';
    if (isset(res[0][0])) {
        master = res[0][0];
    }

    sql = "CALL SP_ORDERS(@s, @m, 'GET_DETAIL', " + id_orders + ", null, null, null, null, null, null, null, null, null, null);";
    res = await db.query(sql);
    let detail = '';
    if (isset(res[0])) {
        detail = res[0];
    }

    let response = [];
    response[0] = master;
    response[0]['detail'] = detail;

    let data = { data: response };
    callback(null, data);
}

module.exports.addOrders = async function(data, callback) {
    let sql = "";
    if (data.action == 'ADD_FIRST') {
        let d = data.detail[0];
        sql = "CALL SP_ORDERS(@s, @m, 'ADD_FIRST', null, null, '" + data.customer + "', 'OPEN', '" + data.note + "', ";
        sql += " null, null, '" + d.id_product + "', '" + d.qty + "', '" + d.unit_cost + "', '" + d.unit_price + "' ) ";
    }

    if (data.action == 'ADD_DETAIL') {
        let d = data.detail[0];
        sql = "CALL SP_ORDERS(@s, @m, 'ADD_DETAIL', '" + data.id_orders + "', null, null, null, null, ";
        sql += " null, null, '" + d.id_product + "', '" + d.qty + "', '" + d.unit_cost + "', '" + d.unit_price + "' ) ";
    }
    //logger(sql);
    let res = await db.query(sql);
    let result = {};
    if (isset(res.affectedRows) && res.affectedRows > 0) {
        result = { status: 'S', message: 'add orders success' };
    }
    callback(null, result);
}

module.exports.addOrdersDetail = async function(data, callback) {
    // let data_master = data.master;
    // let data_detail = data.detail;

    // if (isset(data.id_orders) && !empty(data.id_orders)) {

    // } else {
    (async function asyncFunction() {
        let conn;
        try {
            let sqlDetail = "INSERT INTO orders_detail VALUES (:id_orders, :id_product, :qty, :unit_cost, :unit_price) ";
            let sqlTextDetail = sqlInsert(sqlDetail, data);

            conn = await db.getPool().getConnection();
            const res1 = await conn.query(sqlTextDetail); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

            if (conn) conn.end();
            callback('', res1);
        } catch (err) {
            //throw err;
            console.log(err);
        } finally {
            //if (conn) conn.end();
        }
    })();
    // }
}


module.exports.editOrders = async function(data, callback) {
    let sqlHeader = "UPDATE orders SET (:reference, :orders_name, :ean, :sku, :unit_cost, :unit_price, :active, :date_upd)";
    let where = "WHERE id_orders = " + data.id_orders;
    let sqlText = sqlUpdate(sqlHeader, data, where);
    logger(sqlText);
    db.connection().then((conn, err) => {
        conn.query(sqlText)
            .then((affected) => { callback(null, { affected: affected }); })
            .catch((err) => { callback(err, ''); })
            .finally(() => conn.end())
    });
}

module.exports.deleteOrders = async function(id_orders, data, callback) {
    let sql = "";
    if (data.action == 'DELETE_MASTER') {
        sql = "CALL SP_ORDERS(@s, @m, 'DELETE_MASTER', '" + id_orders + "', null, null, null, null, null, null, null, null, null, null)";
    }

    if (data.action == 'DELETE_DETAIL') {
        sql = "CALL SP_ORDERS(@s, @m, 'DELETE_DETAIL', '" + id_orders + "', null, null, null, null, '" + data.id_orders_detail + "', null, null, null, null, null)";
    }
    logger(sql);
    let res = await db.query(sql);
    let result = {};
    if (isset(res.affectedRows) && res.affectedRows > 0) {
        result = { status: 'S', message: 'delete orders success' };
    }
    callback(null, result);


    // let sqlText = "UPDATE orders SET active = 0 WHERE id_orders = " + data.id_orders;
    // logger(sqlText);
    // db.connection().then((conn, err) => {
    //     conn.query(sqlText)
    //         .then((affected) => { callback(null, { affected: affected }); })
    //         .catch((err) => { callback(err, ''); })
    //         .finally(() => co=nn.end())
    // });
}