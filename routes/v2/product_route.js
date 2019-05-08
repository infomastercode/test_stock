var express = require('express');
var router = express.Router();
var product = require(PATH_ROOT + '/controllers/v2/product.controller');

router.get(APPNAME + '/product', function(req, res) {
    product.getProduct('', (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.get(APPNAME + '/product/:_id', function(req, res) {
    var id = req.params._id;
    product.getProduct(id, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post(APPNAME + '/product/add', (req, res) => {
    var data = req.body;
    product.addProduct(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.put(APPNAME + '/product/{:_id}/edit', (req, res) => {
    var id = req.params._id;
    var data = req.body;
    product.editProduct(id, data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.delete(APPNAME + '/product/{:_id}/delete', (req, res) => {
    var id = req.params._id;
    product.deleteProduct(id, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

module.exports = router;