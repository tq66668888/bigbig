$(function() {
    // alert('ok')
    // var layer = layui.layer
    // 1.定义表单校验规则
    layui.form.verify({
            pwd: [
                /^[\S]{6,12}$/,
                '密码必须是6-12位且不能为空'
            ],
            samepwd: function(value) {
                if (value == $('[name=oldPwd]').val()) {
                    return '两次密码不能一致'
                }
            },

            repwd: function(value) {
                if (value !== $('[name=newPwd]').val()) {
                    return '两次密码必须一致!'
                }
            }
        })
        //完成重置密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        var data = $(this).serialize()
            // console.log(data);
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                return layui.layer.msg(res.message, { icon: 6 }, function() {
                    $('.layui-form')[0].reset()
                })

            }
        })
    })

})