$(function(){
    // 调用getUserInfo获取用户的基本信息
    getUserInfo()
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click',function(){
        // 提示用户是否确认退出
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1.清空本地储存中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = '/login.html'
            // 关闭confirm询问框
            layer.close(index);
          }); 
    })
})
// 获取用户的基本信息
function getUserInfo(){
    $.ajax({
        type:"get",
        url:"/my/userinfo",
        // headers 就是请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token') || '' 
        // },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户的信息失败')
            }
            // 调用 renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败，最终都会调用
        // complete:function(res){
        //     // console.log(res.responseJSON.status);
        //     if(res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败！'){
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //         // 2.强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    });
}
// 渲染用户的头像
function renderAvatar(user){
    // 1.获取用户的名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户的头像
    if(user.user_pic !== null){
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('text-avatar').hide()
    }else{
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}