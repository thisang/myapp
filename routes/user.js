var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// /user 节点接受 PUT 请求
router.put('/user', function (req, res) { 
  res.send('Got a PUT request at /user')
 })

// /user 节点接受 DELETE 请求
router.delete('/user', function (req, res) { 
  res.send('Got a DELETE request at /user')
 })

module.exports = router;
