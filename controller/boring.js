const mysql = require('mysql');
const BR = require('../modules/boring');

class handleBR {
  constructor () {

  }

  // 登录
  login (req, res, nexet) {
    let userinfo = req.body;
    console.log('controller/boring.js', userinfo);
    BR.login(userinfo, (err, data) => {
      if (err) {
        res.status(400).json({err})
      } else if (data.data.length === 0) {
        res.status(400).json({
          err: '用户名或密码错误'
        })
      } else {
        res.json({
          res: 'ok'
        })
      }
    })
  }
}

module.exports = new handleBR;