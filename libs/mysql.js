/**
 * mysql封装
 * @version
 * @copyright
 * @author
 */

 const mysqlJs = require('mysql');
 const config = require('../config');

 const mysql = mysqlJs.createPool(config.mysql);

 exports = module.exports = mysql;