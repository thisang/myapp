const mysql = require('mysql')

class handleTask {
  constructor() {
    var pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'thisang',
      port: 3306
    })
    this.pool = pool;
    this.createTask = this.createTask.bind(this);
    this.getTaskFromCategory = this.getTaskFromCategory.bind(this);
  }
  createTask (req, res, next) {
    this.pool.getConnection(function(err, connection){
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
        connection.query('INSERT INTO task SET ?', obj, function(err, result){
          if (err) {
            console.log(err);
          } else {
            console.log('插入数据成功', result);
            res.send(JSON.stringify({"res": "ok"}));
            connection.release();
          }
        })
      }
    })
  }
  getTaskFromCategory (req, res, next) {
    this.pool.getConnection(function(err, connection) {
      if (err) {
        console.log('连接数据库失败', err);
      } else {
        const category = req.params.category;
        connection.query('SELECT * FROM task WHERE category = ?', [category], function(err, result) {
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

module.exports = new handleTask;