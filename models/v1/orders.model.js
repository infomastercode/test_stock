var db = require('./../config/database');


// module.exports.getOrders = function(id_orders, callback) {
//     let sqlText = "SELECT * FROM orders WHERE 1 ";
//     if (!empty(id_orders)) {
//         sqlText += "AND id_orders = " + id_orders;
//     }
//     db.connection().then((conn, err) => {
//         conn.query(sqlText)
//             .then((affected) => { callback(null, { affected: affected }); })
//             .catch((err) => { callback(err, ''); })
//             .finally(() => conn.end())
//     });
// }

module.exports.addOrders = function(data, callback) {
    let data_master = data.master;
    let data_detail = data.detail;

    if (isset(data.id_orders) && !empty(data.id_orders)) {

    } else {
        (async function asyncFunction() {
            let conn;
            try {
                let sqlHeader = "INSERT INTO orders VALUES (:orders_no, :supplier, :status, :note, :active, :date_add, :date_upd) ";
                let sqlTextHeader = sqlInsert(sqlHeader, data_master);

                conn = await db.getPool().getConnection();
                const res1 = await conn.query(sqlTextHeader); //{ affectedRows: 1, insertId: 14, warningStatus: 0 }

                // add id for master into detail
                data_detail.id_orders = res1.insertId;

                let sqlDetail = "INSERT INTO orders_detail VALUES (:id_orders, :id_product, :qty, :unit_cost, :unit_price) ";
                let sqlTextDetail = sqlInsert(sqlDetail, data_detail);

                const res2 = await conn.query(sqlTextDetail); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

                if (conn) conn.end();
                callback('', { res1, res2 });
            } catch (err) {
                //throw err;
                console.log(err);
            } finally {
                //if (conn) conn.end();
            }
        })();
    }
}

module.exports.addOrdersDetail = function(data, callback) {
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


module.exports.editOrders = function(data, callback) {
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

module.exports.deleteOrders = function(data, callback) {
    let sqlText = "UPDATE orders SET active = 0 WHERE id_orders = " + data.id_orders;
    logger(sqlText);
    db.connection().then((conn, err) => {
        conn.query(sqlText)
            .then((affected) => { callback(null, { affected: affected }); })
            .catch((err) => { callback(err, ''); })
            .finally(() => conn.end())
    });
}