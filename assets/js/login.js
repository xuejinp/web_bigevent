$(function(){
    // 点击去注册账号的链接
    $('#link_reg').on('click',function(){
        $('.loginBox').hide()
        $('.regBox').show()
    })
    // 点击去登录的链接
    $('#link_login').on('click',function(){
        $('.loginBox').show()
        $('.regBox').hide()
    })


    // 从layui 中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify 函数自定义校验规则
    form.verify({
        // 自定义了一个pwd校验规则
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        // 教研两次密码是否一致的规则
        repwd: function(value){
            var pwd = $('.regBox [name=password]').val()
            if(pwd !==value){
                return '两次密码不一致'
            }
        }
    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data = {
            username:$('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.ajax({
            type:"post",
            data,
            url:"/api/reguser",
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                // 模拟人的点击行为
                $('#link_login').click()
            }
            
        });
    })
    // 监听登录的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
          url: '/api/login',
          method: 'POST',
          // 快速获取表单中的数据
          data: $(this).serialize(),
          
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = '/index.html'
          }
        })
    })
})