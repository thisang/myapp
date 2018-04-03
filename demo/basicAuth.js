/* express v4.x 没有basicAuth这个中间件 */
var express = require('express');
var app = express();
app.use(express.basicAuth('admin', '123'));
app.get('/', function(req, res){
  res.send('halo');
})
app.listen(1342, '127.0.0.1');