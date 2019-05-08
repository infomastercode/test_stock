const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    connectionLimit: 5,
    database: 'test_stock'
});

module.exports.connection = function() {
    return new Promise((resolve, reject) => {
        pool.getConnection().then((conn) => {
            resolve(conn);
        }).catch(err => {
            reject(err);
        })
    });
};

module.exports.getPool = function() {
    return pool;
};

module.exports.query = async function(sql) {
    let conn = await this.getPool().getConnection();
    let res = await conn.query(sql);
    if (conn) conn.end();
    return res;
};


// called :
// var db = require('./../config/database');
// db.connection().then((conn, err) => {
//     conn.query("SELECT 1 AS val")
//         .then((data) => { console.log(data[0].val); })
//         .then((x) => { console.log(x); return 'aa'; })
//         .then((x) => { console.log(x); })
//         .finally(() => conn.end())
// });