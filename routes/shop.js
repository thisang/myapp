var express = require('express');
var router = express.Router();

const handleBoring = require('../controller/boring');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('shop/index', { title: 'shop' });
});

// 无趣
router.post('/boring/login', handleBoring.login)


module.exports = router;
