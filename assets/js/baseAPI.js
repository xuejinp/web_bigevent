// 每次调用get psot ajax的时候会先调用ajaxPrefilter函数
$.ajaxPrefilter(function(options){
    console.log(options.url)
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // 统一为有权限的接口，设置headers请求头
    if(options.url.startsWith('http://ajax.frontend.itheima.net/my/')){
    // if(options.url.indexOf('/my/') !== 0){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载 complete回调函数
    options.complete = function(res){
        if(res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败！'){
            // 1.强制清空token
            localStorage.removeItem('token')
            // 2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})