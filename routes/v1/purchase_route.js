var express = require('express');
var router = express.Router();

var purchase = require('./../controllers/purchase.controller');

router.get('/purchase/:_id', function(req, res) {
    var id = req.params._id;
    purchase.getPurchase(id, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post('/purchase/add', (req, res) => {
    var data = req.body;
    purchase.addPurchase(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post('/purchase/add/detail', (req, res) => {
    var data = req.body;
    purchase.addPurchaseDetail(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post('/purchase/edit', (req, res) => {
    var data = req.body;
    purchase.editPurchase(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post('/purchase/delete', (req, res) => {
    var data = req.body;
    purchase.deletePurchase(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

module.exports = router;