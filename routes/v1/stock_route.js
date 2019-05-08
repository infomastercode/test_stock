var express = require('express');
var router = express.Router();

var stock = require('./../controllers/stock.controller');

router.get('/stock', function(req, res) {
    stock.getStock('', (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

// router.get('/stock/:_id', function(req, res) {
//     var id = req.params._id;
//     stock.getStock(id, (err, succ) => {
//         if (err) {
//             throw err;
//         }
//         res.json(succ);
//     });
// });

router.post('/stock/add', (req, res) => {
    var data = req.body;
    stock.addStock(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

// router.post('/stock/edit', (req, res) => {
//     var data = req.body;
//     stock.editStock(data, (err, succ) => {
//         if (err) {
//             throw err;
//         }
//         res.json(succ);
//     });
// });

// router.post('/stock/delete', (req, res) => {
//     var data = req.body;
//     stock.deleteStock(data, (err, succ) => {
//         if (err) {
//             throw err;
//         }
//         res.json(succ);
//     });
// });

module.exports = router;