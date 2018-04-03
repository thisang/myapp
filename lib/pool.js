// 导入 mysql 模块
var mysql = require('mysql');
// 导入配置文件
var conf = require('../conf/db.js');

var pool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  database: conf.database,
  port: conf.port
})

//导出查询相关  
var query = function (sql, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log('与 MYSQL 数据库建立连接失败');
      callback(err, null, null);
    } else {
      console.log('与 MYSQL 数据库建立连接成功');
      connection.query(sql, function (qerr, resulet, fields) {
        //释放连接    
        pool.end();

        //事件驱动回调    
        callback(qerr, resulet, fields);
      });
    }
  });
  pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1')
  });
}; 

module.exports = query;
