var db = require('./../config/database');


module.exports.getLocation = function(id_location, callback) {
    let sqlText = "SELECT * FROM location WHERE 1 ";
    if (!empty(id_location)) {
        sqlText += "AND id_location = " + id_location;
    }
    db.connection().then((conn, err) => {
        conn.query(sqlText)
            .then((affected) => { callback(null, { affected: affected }); })
            .catch((err) => { callback(err, ''); })
            .finally(() => conn.end())
    });
}

module.exports.addLocation = function(data, callback) {
    let sqlMaster = "INSERT INTO location VALUES (:zone, :location, :type, :active, :date_add, :date_upd) ";
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

module.exports.editLocation = function(data, callback) {
    let sqlMaster = "UPDATE location SET (:zone, :location, :type, :date_upd)";
    let where = "WHERE id_location = " + data.id_location;
    let sqlText = sqlUpdate(sqlMaster, data, where);
    //logger(sqlText);return;
    db.connection().then((conn, err) => {
        conn.query(sqlText)
            .then((affected) => { callback(null, { affected: affected }); })
            .catch((err) => { callback(err, ''); })
            .finally(() => conn.end())
    });
}

module.exports.deleteLocation = function(data, callback) {
    let sqlText = "UPDATE location SET active = 0 WHERE id_location = " + data.id_location;
    //logger(sqlText);return;
    db.connection().then((conn, err) => {
        conn.query(sqlText)
            .then((affected) => { callback(null, { affected: affected }); })
            .catch((err) => { callback(err, ''); })
            .finally(() => conn.end())
    });
}
