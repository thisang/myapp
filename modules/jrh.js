/**
 * 聚蕊烩
 * @version
 * @copyright
 * @author
 */

const mysql = require('../libs/mysql');

class JRH {
  /**
   * 获取文章列表
   * @param {String} city 城市
   * @param {Number} start 开始
   * @param {Number} size 获取数量
   * @param {Function} callback
   */
  static getArticleList (city, start, size, callback) {
    callback = typeof callback !== 'function' ? function () {} : callback;
    const sql = 'select * from article where city = ? sort by ctime limit ? , ?';
    mysql.query(sql, [city, start, size], (err, rows) => {
      callback(err, rows);
    })
  }
}

exports = module.exports = JRH;
