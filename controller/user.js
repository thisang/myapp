const mysql = require('mysql')

class handleUser {
  constructor() {
    var pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'thisang',
      port: 3306
    })
    this.pool = pool;
    this.getAllUser = this.getAllUser.bind(this);
    this.addUser = this.addUser.bind(this);
  }
  getAllUser (req, res, next) { 
    this.pool.getConnection(function(err, connection) {
      if (err) {
        console.log('连接数据库失败', err);
      } else {
        connection.query('select * from user', function(err, result) {
          if (err) {
            console.log(err)
          } else {
            console.log('查询所有用户', result);
            res.send(JSON.stringify(result));
            connection.release();
          }
        })
      }
    })
  }
  addUser (req, res, next) {
    console.log(req.body);
    this.pool.getConnection(function(err, connection) {
      if (err) {
        console.log('连接数据库失败', err);
      } else {
        let bodyObj = JSON.parse(Object.keys(req.body)[0]);
        if (!(bodyObj.username && bodyObj.password)) {
          throw new error('username password 不存在');
          return;
        }
        // connection.query('SELECT username FROM user WHERE username = ?', [bodyObj.username], function(err, result) {
        //   if (err) {
        //     throw new error('查询对应的username失败');
        //     return;
        //   } else {
        //     console.log('查询对应的username成功', result);
        //     res.send(JSON.stringify(result));
        //   }
        // })
        connection.query('INSERT INTO user SET ?', {username: bodyObj.username, password: bodyObj.password}, function(err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log('添加用户成功');
            res.send(JSON.stringify({"res": 'ok'}))
            connection.release();
          }
        })
      }
    })
  }
}

module.exports = new handleUser;