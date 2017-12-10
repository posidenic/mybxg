define(['jquery', 'cookie'], function ($) {
    // 登录功能模块
    $('#loginBtn').click(function () {
        $.ajax({
            type: 'post',
            url: "/api/login",
            // 使用表单序列化获取所有表单数据
            data: $('#loginForm').serialize(),
            dataType: 'json',
            success: function (data) {
                // 登陆成功，跳转到主页
                if (data.code == 200) {
                    // 把用户的登录信息存储到cookie中，方便跨页面共享登录信息的数据
                    // 注意：cookie中只能存储字符串，所以要转换一下
                    $.cookie('loginInfo', JSON.stringify(data.result), { path: '/' })

                    location.href = '/main/index';
                }
            }
        });
        return false;
    })

})