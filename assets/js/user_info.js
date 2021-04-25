$(function() {
    //,获取用户信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                // 把用户信息展示到表单中
                // $('[name=username]').val(res.data.username)
                // $('[name=nickname]').val(res.data.nickname)
                // $('[name=email]').val(res.data.email)
                // $('[name=id]').val(res.data.id)
                layui.form.val("formUserInfo", res.data);
            }

        })
    }
    // 表单重置
    $('#btnReset').on('click', function(e) {
            e.preventDefault()
            initUserInfo()
        })
        // 自定义一个验证昵称长度的规则
    layui.form.verify({
            nickname: function(value, item) {
                if (value.length > 6) {
                    return '昵称不能超过6个字符'
                }
            }
        })
        // 完成用户修改功能
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        var data = $(this).serialize()
            // console.log(data);
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 })
                    // console.log(res);
                window.parent.getUserInfo()

            },

        })
    })









})