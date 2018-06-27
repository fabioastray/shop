var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('server api response');
});

router.get('/home', function(req, res, next) {
    res.send('welcome to a home route');
});

module.exports = router;
