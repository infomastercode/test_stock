var express = require('express');
var router = express.Router();
var location = require(PATH_ROOT + '/controllers/v2/location.controller');

router.get(APPNAME + '/location', function(req, res) {
    location.getLocation('', (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.get(APPNAME + '/location/:_id', function(req, res) {
    var id = req.params._id;
    location.getLocation(id, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.post(APPNAME + '/location/add', (req, res) => {
    var data = req.body;
    location.addLocation(data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.put(APPNAME + '/location/:_id/edit', (req, res) => {
    var id = req.params._id;
    var data = req.body;
    location.editLocation(id, data, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

router.delete(APPNAME + '/location/:_id/delete', (req, res) => {
    var id = req.params._id;
    location.deleteLocation(id, (err, succ) => {
        if (err) {
            throw err;
        }
        res.json(succ);
    });
});

module.exports = router;