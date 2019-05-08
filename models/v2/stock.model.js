var db = require(PATH_ROOT + '/config/database');


module.exports.getStock = async function(id_stock, callback) {
    let sqlText = "SELECT * FROM stock WHERE 1 ";
    if (!empty(id_stock)) {
        sqlText += "AND id_stock = " + id_stock;
    }
    db.connection().then((conn, err) => {
        conn.query(sqlText)
            .then((affected) => { callback(null, { affected: affected }); })
            .catch((err) => { callback(err, ''); })
            .finally(() => conn.end())
    });
}

module.exports.addStock = async function(data, callback) {
    let sqlMaster = "INSERT INTO stock VALUES (:id_product, :id_location, :action, :qty, :date_add, :date_upd) ";
    let sqlText = sqlInsert(sqlMaster, data);
    // logger(sqlText);
    // callback('', sqlText);return;
    db.connection().then((conn, err) => {
        conn.query(sqlText)
            .then((affected) => { callback(null, { affected: affected }); })
            .catch((err) => { callback(err, ''); })
            .finally(() => conn.end())
    });
}

// module.exports.editStock = function(data, callback) {
//     let sqlMaster = "UPDATE stock SET (:zone, :stock, :type, :date_upd)";
//     let where = "WHERE id_stock = " + data.id_stock;
//     let sqlText = sqlUpdate(sqlMaster, data, where);
//     //logger(sqlText);return;
//     db.connection().then((conn, err) => {
//         conn.query(sqlText)
//             .then((affected) => { callback(null, { affected: affected }); })
//             .catch((err) => { callback(err, ''); })
//             .finally(() => conn.end())
//     });
// }

// module.exports.deleteStock = function(data, callback) {
//     let sqlText = "UPDATE stock SET active = 0 WHERE id_stock = " + data.id_stock;
//     //logger(sqlText);return;
//     db.connection().then((conn, err) => {
//         conn.query(sqlText)
//             .then((affected) => { callback(null, { affected: affected }); })
//             .catch((err) => { callback(err, ''); })
//             .finally(() => conn.end())
//     });
// }
