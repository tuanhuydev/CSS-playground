const express = require('express');
const router = express.Router()

router.get('/', function(req, res) {
    return res.render('home');
});

router.get('/nexter', function(req, res) {
    return res.render('nexter');
});

router.get('/partswise', function(req, res) {
    return res.render('partswise');
});

router.get('/mb-remodeling', function(req, res) {
    return res.render('mb-remodeling');
});

module.exports = router;