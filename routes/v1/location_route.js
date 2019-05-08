var express = require('express');
var router = express.Router();

var location = require('./../controllers/location.controller');

router.get('/location', function(req, res) {
    location.getLocation('', (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.get('/location/:_id', function(req, res) {
    var id = req.params._id;
    location.getLocation(id, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post('/location/add', (req, res) => {
    var data = req.body;
    location.addLocation(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post('/location/edit', (req, res) => {
    var data = req.body;
    location.editLocation(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post('/location/delete', (req, res) => {
    var data = req.body;
    location.deleteLocation(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

module.exports = router;