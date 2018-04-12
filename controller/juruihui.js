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
    this.logout = this.logout.bind(this);
    this.signin = this.signin.bind(this);
  }
  // 登录
  login(req, res, next) {
    this.pool.getConnection((err, connection) => {
      if (err) {
				res.send({
          err: '数据库连接失败'
				})
      } else {
        let loginInfo = req.body;

        if (!(loginInfo.phone && loginInfo.password)) {
          res.send({
            err: '缺少phone或者password字段'
          })
          return;
        }
        let loginuser
        connection.query('SELECT * FROM user WHERE phone = ?', [loginInfo.phone], (err, result) => {
          if (err) {
            res.send({
              err: '查找用户失败'
            })
            connection.release();            
            return;
          }
          if (result.length === 0) {
            res.send({
              err: '用户不存在'
            })
            connection.release();
            return;
          }
          if (result[0].password !== loginInfo.password) {
            res.send({
              err: '密码错误'
            })
            connection.release();            
            return;
          }
          loginuser = result[0];
          console.log('loginuser', loginuser);
          this.setUserOnline(loginuser, loginInfo.city)
          .then(() => {
            res.send(loginuser);
            connection.release();
          })
          .catch(() => {
            res.send({
              err: '登录失败'
            })
            connection.release();
          })         
        })
      }
    })
  }
  // 注销
  logout(req, res, next) {
    let uid = req.body.uid;
    this.setOnlineWithValue(uid, 0)
    .then(() => {
      res.send({
        res: '注销成功'
      })
    })
  }
  // 注册
  signin(req, res, next) {
    let body_user = req.body;
    this.phoneExit(body_user.phone).then(exit => {
      if (exit) {
        res.send({
          err: '手机号已注册'
        })
      } else {
        this.addUser(body_user).then(() => {
          res.send({
            res: '注册成功'
          })
        })
      }
    })
  }
  //  添加用户
  addUser (user) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          console.log(new Error('连接数据库失败'));
        } else {
          connection.query('INSERT INTO user(username, password, phone, role) VALUES (?, ?, ?, ?)', [user.username, user.password, user.phone, user.role], (err, result) => {
            if (err) {
              console.log(new Error('添加用户失败'), err);
              connection.release();
            } else {
              console.log('user表添加用户成功');
              resolve();
              connection.release();
            }
          })
        }
      })
    })
  }
  // 检测手机号是否以及注册
  phoneExit (phone) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          console.log(new Error('数据库连接失败'));
        } else {
          connection.query('SELECT * FROM user WHERE phone = ?', [phone], (error, result) => {
            if (error) {
              console.log(new Error('查询失败'));
              connection.release();
            } else {
              connection.release();
              if (result.length === 0) {
                console.log('该手机未注册');
                resolve(false);
              } else {
                console.log('该手机号已注册');
                resolve(true);
              }
            }
          })
        }
      })
    })
  }
  // 设置用户在线
  setUserOnline (user, city) {
    return new Promise((resolve, reject) => {
      this.getOnlineUser(user.uid).then(onlineInfo => {
        if (onlineInfo.length === 0) {
          // 用户第一次登录
          console.log(`${user.username}|${user.uid}首次登录`);
          this.addOnlineWithUser(user, city).then(() => {
            resolve();
          })
        } else {
          // 用户再次登录
          console.log(`${user.username}|${user.uid}再次登录`);
          this.setOnlineWithValue(user.uid, 1, city, new Date().getTime()).then(() => {
            resolve();
          })
        }
      })
    })
  }
  // 在online表中添加在线用户
  addOnlineWithUser (user, city) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err ){
          console.log(new Error('数据库连接失败'));
          connection.release();
        } else {
          connection.query('INSERT INTO online(uid, username, lastLoginLocation, lastLoginTime, online) VALUES (?, ?, ?, ?, ?)', [user.uid, user.username, city, new Date().getTime(), 1], (err, result) => {
            if (err) {
              console.log(new Error('查询失败'));
              connection.release();
            } else {
              console.log('online表添加在线用户成功');
              resolve(result);
              connection.release();
            }
          })
        }
      })
    })
  }
  /**
   * 在online表中设置用户online=vlaue
   * @param {String} uid 用户uid
   * @param {Number} online 0 || 1
   * @param {String} city 最后登录位置
   * @param {String} time 最后登录时间
   */
  setOnlineWithValue (uid, online, city, time) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function (err, connection) {
        if (err ){
          console.log(new Error('数据库连接失败'));
          connection.release();
        } else {
          let sql, sqlParamArr;
          if (online) {
            // online
            sql = 'UPDATE online SET online = ?, lastLoginTime = ?, lastLoginLocation = ? WHERE uid = ?';
            sqlParamArr = [online, time, city, uid];
          } else {
            // offline
            sql = 'UPDATE online SET online = ? WHERE uid = ?';
            sqlParamArr = [online, uid];
          }
          connection.query(sql, sqlParamArr, (err, result) => {
            if (err) {
              console.log(new Error('查询失败'), err);
              connection.release();
            } else {
              console.log('更改用户登录状态成功', online);
              resolve(result);
              connection.release();
            }
          })
        }
      })
    })
  }
  // 查询online表中是否存在对应用户
  getOnlineUser (uid) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function(err, connection) {
        connection.query('SELECT uid FROM online WHERE uid = ?', [uid], (error, result) => {
          if (error) {
            console.log(new Error('数据库连接失败'))
            reject();
            connection.release();
          } else {
            console.log('查询online表成功', result);
            resolve(result)
            connection.release();
          }
        })
      })
    }) 
  }
}

module.exports = new handleJRH;