$(function() {
    // 显示和隐藏
    // $('#link_login').on('click', function() {
    //     //登录显示注册隐藏
    //     $('.reg-box').hide().siblings('.login-box').show()
    //         
    // })
    // $('#link_reg').on('click', function() {
    //     // 登录隐藏注册显示
    //     $('.reg-box').show().siblings('.login-box').hide()
    //         
    // })
    // 优化
    $('#link_reg,#link_login').on('click', function() {
            $('.reg-box,.login-box').toggle()
        })
        // 自定义表单类型
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须是6-12位的非空字'
        ],
        repwd: function(value, item) {
            var pwd = $('#form_reg [name=password]').val()
            if (pwd !== value) {
                return '两次密码必须一致'
            }
        }
    })

    // 注册功能
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
                // var aa = $(this).serialize()
                // console.log(aa);
            var data = {
                    username: $('#form_reg [name=username]').val().trim(),
                    password: $('#form_reg [name=password]').val().trim()
                }
                // console.log(data);
            $.ajax({
                type: 'post',
                url: '/api/reguser',
                data: data,
                success: function(res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        // return alert('注册失败')
                        return layui.layer.msg(res.message, { icon: 5 })
                    }
                    layui.layer.msg('注册用户成功', { icon: 6 }, function() {
                        $('#link_login').click()
                    })

                }
            })
        })
        // 登录功能
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        var data = $(this).serialize()
            // console.log(data);
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: data,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    //把token保存到本地存储
                    localStorage.setItem('token', res.token)
                    location.herf = 'index.html'
                })
            }
        })
    })







})