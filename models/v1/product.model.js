var db = require('./../config/database');


module.exports.getProduct = function(id_product, callback) {
    let sqlText = "SELECT * FROM product WHERE 1 ";
    if (!empty(id_product)) {
        sqlText += "AND id_product = " + id_product;
    }
    db.connection().then((conn, err) => {
        conn.query(sqlText)
            .then((affected) => { callback(null, { affected: affected }); })
            .catch((err) => { callback(err, ''); })
            .finally(() => conn.end())
    });
}

module.exports.addProduct = function(data, callback) {
    let sqlHeader = "INSERT INTO product VALUES (:reference, :product_name, :ean, :sku, :unit_cost, :unit_price, :active, :date_add, :date_upd) ";
    let sqlText = sqlInsert(sqlHeader, data);
    //logger(sqlText);
    //callback('', sqlInsert(sqlText, post));
    db.connection().then((conn, err) => {
        conn.query(sqlText)
            .then((affected) => { callback(null, { affected: affected }); })
            .catch((err) => { callback(err, ''); })
            .finally(() => conn.end())
        // conn.query({ namedPlaceholders: true, sql: sqlText }, post)
        //     .then((affected) => { callback(null, { status: 'ok' }); })
        //     .catch(err => console.log(err))
        //     .finally(() => conn.end())
    });
}

module.exports.editProduct = function(data, callback) {
    let sqlHeader = "UPDATE product SET (:reference, :product_name, :ean, :sku, :unit_cost, :unit_price, :active, :date_upd)";
    let where = "WHERE id_product = " + data.id_product;
    let sqlText = sqlUpdate(sqlHeader, data, where);
    logger(sqlText);
    db.connection().then((conn, err) => {
        conn.query(sqlText)
            .then((affected) => { callback(null, { affected: affected }); })
            .catch((err) => { callback(err, ''); })
            .finally(() => conn.end())
    });
}

module.exports.deleteProduct = function(data, callback) {
    let sqlText = "UPDATE product SET active = 0 WHERE id_product = " + data.id_product;
    logger(sqlText);
    db.connection().then((conn, err) => {
        conn.query(sqlText)
            .then((affected) => { callback(null, { affected: affected }); })
            .catch((err) => { callback(err, ''); })
            .finally(() => conn.end())
    });
}



// db.getConnection()
//     .then(conn => {

//         conn.query("SELECT 1 as val")
//             .then((rows) => {
//                 console.log(rows); //[ {val: 1}, meta: ... ]
//                 //Table must have been created before 
//                 // " CREATE TABLE myTable (id int, val varchar(255)) "
//                 return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//             })
//             .then((res) => {
//                 console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//                 conn.end();
//             })
//             .catch(err => {
//                 //handle error
//                 console.log(err);
//                 conn.end();
//             })

//     }).catch(err => {
//      console.log(err);
//         //not connected
//     });