var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

router.get('/images/:id', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/../assets/' + req.params.id));
});

module.exports = router;