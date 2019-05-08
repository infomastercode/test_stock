var db = require('./../config/database');


// module.exports.getPurchase = function(id_purchase, callback) {
//     let sqlText = "SELECT * FROM purchase WHERE 1 ";
//     if (!empty(id_purchase)) {
//         sqlText += "AND id_purchase = " + id_purchase;
//     }
//     db.connection().then((conn, err) => {
//         conn.query(sqlText)
//             .then((affected) => { callback(null, { affected: affected }); })
//             .catch((err) => { callback(err, ''); })
//             .finally(() => conn.end())
//     });
// }

module.exports.addPurchase = function(data, callback) {
    let data_master = data.master;
    let data_detail = data.detail;

    if (isset(data.id_purchase) && !empty(data.id_purchase)) {

    } else {
        (async function asyncFunction() {
            let conn;
            try {
                let sqlHeader = "INSERT INTO purchase VALUES (:purchase_no, :supplier, :status, :note, :active, :date_add, :date_upd) ";
                let sqlTextHeader = sqlInsert(sqlHeader, data_master);

                conn = await db.getPool().getConnection();
                const res1 = await conn.query(sqlTextHeader); //{ affectedRows: 1, insertId: 14, warningStatus: 0 }

                // add id for master into detail
                data_detail.id_purchase = res1.insertId;

                let sqlDetail = "INSERT INTO purchase_detail VALUES (:id_purchase, :id_product, :qty, :unit_cost, :unit_price) ";
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

module.exports.addPurchaseDetail = function(data, callback) {
    // let data_master = data.master;
    // let data_detail = data.detail;

    // if (isset(data.id_purchase) && !empty(data.id_purchase)) {

    // } else {
    (async function asyncFunction() {
        let conn;
        try {
            let sqlDetail = "INSERT INTO purchase_detail VALUES (:id_purchase, :id_product, :qty, :unit_cost, :unit_price) ";
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


module.exports.editPurchase = function(data, callback) {
    let sqlHeader = "UPDATE purchase SET (:reference, :purchase_name, :ean, :sku, :unit_cost, :unit_price, :active, :date_upd)";
    let where = "WHERE id_purchase = " + data.id_purchase;
    let sqlText = sqlUpdate(sqlHeader, data, where);
    logger(sqlText);
    db.connection().then((conn, err) => {
        conn.query(sqlText)
            .then((affected) => { callback(null, { affected: affected }); })
            .catch((err) => { callback(err, ''); })
            .finally(() => conn.end())
    });
}

module.exports.deletePurchase = function(data, callback) {
    let sqlText = "UPDATE purchase SET active = 0 WHERE id_purchase = " + data.id_purchase;
    logger(sqlText);
    db.connection().then((conn, err) => {
        conn.query(sqlText)
            .then((affected) => { callback(null, { affected: affected }); })
            .catch((err) => { callback(err, ''); })
            .finally(() => conn.end())
    });
}