// var express = require('express');
// var router = express.Router();

// var mysql = require('mysql')

// var user = require('../user/user.js')

// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// })

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'HALO' });

//   var conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'thisang',
//     port: 3306
//   })
//   conn.connect(function(err) {
//     if (err) {
//       console.log('连接数据库失败');
//     } else {
//       console.log('连接数据库成功');
//       conn.query('select * from user', function(err, result) {
//         if (err) {
//           console.log('查询失败', err)
//         } else {
//           console.log('查询所有用户', result);
//           endConn();
//         }
//       })
//     }
//   });
//   var endConn = function (err) {
//     if (err) {
//       console.log('关闭数据库失败');
//     } else {
//       console.log('关闭数据库成功');
//     }
//   }
// });

// // 首页接受 get 请求 获取用户
// router.get('/', function (req, res, next) { 
//   console.log('/ 接受 get 请求');
//   user.getUser(req, res, next)
//  })

// router.get('/myapp', function (req, res, next) {
//   console.log('/myapp 接受 get 请求');
//   // user.getUser(req, res, next);

//   var conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'thisang',
//     port: 3306
//   })
//   conn.connect(function(err) {
//     if (err) {
//       console.log('连接数据库失败');
//     } else {
//       console.log('连接数据库成功');
//       conn.query('select * from user', function(err, result) {
//         if (err) {
//           console.log('查询失败', err)
//         } else {
//           console.log('查询所有用户', result);
//           res.send(JSON.stringify(result));
//           conn.end(function(err) {
//             if (err) {
//               console.log('关闭数据库失败');
//             } else {
//               console.log('关闭数据库成功');
//             }
//           });
//         }
//       })
//     }
//   });
// })

var api = require('./api');
var shop = require('./shop');
var user = require('./user');

const handleRoute = function (app) { 
  app.use('/api', api);
  app.use('/shop', shop);
  app.use('/user', user);
}
module.exports = handleRoute
