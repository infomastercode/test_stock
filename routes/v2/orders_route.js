var express = require('express');
var router = express.Router();
var orders = require(PATH_ROOT + '/controllers/v2/orders.controller');

router.get(APPNAME + '/orders', function(req, res) {
    orders.getOrders('', (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.get(APPNAME + '/orders/:_id', function(req, res) {
    var id = req.params._id;
    orders.getOrders(id, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.get(APPNAME + '/orders/:_id/form', function(req, res) {
    var id = req.params._id;
    orders.getOrdersForm(id, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post(APPNAME + '/orders/add', (req, res) => {
    var data = req.body;
    orders.addOrders(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

// router.post(APPNAME + '/orders/add/detail', (req, res) => {
//     var data = req.body;
//     orders.addOrdersDetail(data, (err, succ) => {
//         if (err) {
//             throw err;
//         }
//         res.json(succ);
//     });
// });

router.post(APPNAME + '/orders/:_id/edit', (req, res) => {
    var id = req.params._id;
    var data = req.body;
    orders.editOrders(id, data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.delete(APPNAME + '/orders/:_id/delete', (req, res) => {
    var id = req.params._id;
    var data = req.body;
    orders.deleteOrders(id, data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

module.exports = router;