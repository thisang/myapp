// var headerP = document.querySelector('header p');
// setTimeout(() => {
//   headerP.innerHTML = '哈哈哈哈哈'
// }, 2000);

// 获取所有用户
$.get('http://localhost:3000/api/allusers', function(data){
  console.log(data);
})
