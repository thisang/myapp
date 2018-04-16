var api = require('./api');
var shop = require('./shop');
var user = require('./user');

const handleRoute = function (app) { 
  app.use('/api', api);
  app.use('/shop', shop);
  app.use('/user', user);
}
module.exports = handleRoute
