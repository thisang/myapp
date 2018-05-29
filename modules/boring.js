/**
 * 无趣
 * @version 0.1
 * @copyright
 * @author thisang
 */

const mysql = require('../libs/mysql');

class BR {
  /**
   * 登录
   */
  static login (userinfo, callback) {
    callback = typeof callback !== 'function' ? function () {} : callback;
    const sql = 'select * from user where username = ? and password = ?';
    mysql.query(sql, [userinfo.username, userinfo.password], (err, rows) => {
      callback(err, rows);
    })
  }
}

exports = module.exports = BR;