const mysql = require('mysql')

class handleJRH {
  constructor() {
    var pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'juruihui',
      port: 3306
    })
    this.pool = pool;
    this.login = this.login.bind(this);
    this.createTask = this.createTask.bind(this);
    this.getTaskFromCategory = this.getTaskFromCategory.bind(this);
  }
  // 登录
  login(req, res, next) {
    this.pool.getConnection(function(err, connection) {
      if (err) {
				res.send({
          err: '数据库连接失败'
				})
      } else {
        let loginInfo = req.body;
        if (!(loginInfo.username && loginInfo.password)) {
          res.send({
            err: '缺少username或者password字段'
          })
          return;
        }
        connection.query('SELECT * FROM user WHERE username = ?', [loginInfo.username], (err, result) => {
          if (err) {
            res.send({
              err: '查找用户失败'
            })
            return;
          }
          if (result.length === 0) {
            res.send({
              err: '用户不存在'
            })
            return;
          }
          if (result[0].password !== loginInfo.password) {
            res.send({
              err: '密码错误'
            })
            return;
          }
          res.send({
            res: 'ok'
          });
          connection.release();
        })
      }
    })
  }
  // 注销
  logout(req, res, next) { }
  // 注册
  signin(req, res, next) { }
  createTask(req, res, next) {
    this.pool.getConnection(function (err, connection) {
      if (err) {
        console.log('连接数据库失败', err);
      } else {
        let bodyObj = JSON.parse(Object.keys(req.body)[0]);
        console.log(bodyObj);
        let obj = {
          taskname: bodyObj.taskname,
          category: bodyObj.category,
          assign: bodyObj.assign,
          patient: bodyObj.patient,
          datetime: bodyObj.datetime,
          file: bodyObj.file,
          description: bodyObj.description
        }
        connection.query('INSERT INTO task SET ?', obj, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log('插入数据成功', result);
            res.send(JSON.stringify({ "res": "ok" }));
            connection.release();
          }
        })
      }
    })
  }
  getTaskFromCategory(req, res, next) {
    this.pool.getConnection(function (err, connection) {
      if (err) {
        console.log('连接数据库失败', err);
      } else {
        const category = req.params.category;
        connection.query('SELECT * FROM task WHERE category = ?', [category], function (err, result) {
          if (err) {
            console.log('查询失败');
          } else {
            console.log('查询任务成功', result);
            res.send(JSON.stringify(result));
            connection.release();
          }
        })
      }
    })
  }
}

module.exports = new handleJRH;