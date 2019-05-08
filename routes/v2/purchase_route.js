var express = require('express');
var router = express.Router();
var purchase = require(PATH_ROOT + '/controllers/v2/purchase.controller');

router.get(APPNAME + '/purchase', function(req, res) {
    purchase.getPurchase('', (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.get(APPNAME + '/purchase/:_id', function(req, res) {
    var id = req.params._id;
    purchase.getPurchase(id, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post(APPNAME + '/purchase/add', (req, res) => {
    var data = req.body;
    purchase.addPurchase(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

// router.post(APPNAME + '/purchase/add/detail', (req, res) => {
//     var data = req.body;
//     purchase.addPurchaseDetail(data, (err, succ) => {
//         if (err) {
//             throw err;
//         }
//         res.json(succ);
//     });
// });

// router.post(APPNAME + '/purchase/edit', (req, res) => {
//     var data = req.body;
//     purchase.editPurchase(data, (err, succ) => {
//         if (err) {
//             throw err;
//         }
//         res.json(succ);
//     });
// });

// router.post(APPNAME + '/purchase/delete', (req, res) => {
//     var data = req.body;
//     purchase.deletePurchase(data, (err, succ) => {
//         if (err) {
//             throw err;
//         }
//         res.json(succ);
//     });
// });

module.exports = router;