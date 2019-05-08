var express = require('express');
var router = express.Router();

var product = require('./../controllers/product.controller');

// router.get('/product/test', function(req, res) 
//     var db = require('./../config/database');
//     db.connection().then((conn, err) => {
//         conn.query("SELECT 1 AS val")
//             .then((data) => { console.log(data[0].val); })
//             .then((x) => { console.log(x); return 'aa'; })
//             .then((x) => { console.log(x); })
//             .finally(() => conn.end())
//     });
//     res.send('respond with a resource');
// });

router.get('/product', function(req, res) {
    product.getProduct('', (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.get('/product/:_id', function(req, res) {
    var id = req.params._id;
    product.getProduct(id, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post('/product/add', (req, res) => {
    var data = req.body;
    product.addProduct(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });

    // let respose = product.addProduct(req.body);
    // res.json(respose);
    //res.json({ status: 1, message: 'add product success' });
});

router.post('/product/edit', (req, res) => {
    var data = req.body;
    product.editProduct(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post('/product/delete', (req, res) => {
    var data = req.body;
    product.deleteProduct(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

module.exports = router;