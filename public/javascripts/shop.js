// var headerP = document.querySelector('header p');
// setTimeout(() => {
//   headerP.innerHTML = '哈哈哈哈哈'
// }, 2000);

// 获取所有用户
// $.get('http://localhost:3000/api/allusers', function(data){
//   console.log(data);
// })

// 设置cookie
const setCookie = function (cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  let expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

// 获取cookie
const getCookieFormName = function (cname) {
  console.log('获取 cookie', cname);
  let name = cname + '=';
  let cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i ++) {
    console.log(cookieArr[i]);
    let c = cookieArr[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
    return '';
  }
}
// 判断是否登录
const isLogin = function () {
  let userCookie = getCookieFormName('boring_id');
  if (userCookie) {
    return true;
  }
  return false;
}

// 登录
$('.login').click(() => {
  if (isLogin()) {
    console.log('已登录, 非法操作');
  } else {
    $('.dialog-login').show();
  }
  // $.get('/api/allusers', (data) => {
  //   console.log('获取用户', data);
  //   $('.dialog-login').show();
  // })
})
// 执行登录逻辑
$('.dialog-login button.btn').click(() => {
  let username = $('.login-body input[name="username"]').val().trim();
  let password = $('.login-body input[name="password"]').val().trim();
  if (username && password) {
    let data = {
      username: username,
      password: password
    }
    $.post('shop/boring/login', data, res => {
      console.log('login res', res);
      $('.dialog-login').hide();
      $('header .login').hide();
      $('header .loginer').show();

      // 设置cookie
      setCookie('boring_id', username);
      setCookie('boring_code', password);
    })
  } else {
    alert('请填写用户名和密码');
  }
})
// 关闭登录弹窗
$('.dialog-login .close').click(() => {
  $('.dialog-login').hide();
})
