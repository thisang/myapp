var query = require('../lib/pool.js')

const getUser = function (req, res, next) {
  query('select * from user', function (err, result, fields) { 
    console.log('-----------------', err);
    console.log('-----------------', result);
    console.log('-----------------', fields);
    // console.log('err', err, 'result', result);
   })
}

module.exports = {
  getUser
}