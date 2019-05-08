var express = require('express');
var router = express.Router();

var orders = require('./../controllers/orders.controller');

router.get('/orders/:_id', function(req, res) {
    var id = req.params._id;
    orders.getOrders(id, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post('/orders/add', (req, res) => {
    var data = req.body;
    orders.addOrders(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post('/orders/add/detail', (req, res) => {
    var data = req.body;
    orders.addOrdersDetail(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post('/orders/edit', (req, res) => {
    var data = req.body;
    orders.editOrders(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post('/orders/delete', (req, res) => {
    var data = req.body;
    orders.deleteOrders(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

module.exports = router;