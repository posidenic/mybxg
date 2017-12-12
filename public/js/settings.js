define(['jquery', 'template'], function ($, template) {
    // 调用接口，获取个人信息
    $.ajax({
        type: 'get',
        url: '/api/teacher/profile',
        dataType: 'json',
        success: function (data) {
            console.log(data);

            // 根据获取到的个人信息，填充模板，添加到页面显示
            var html = template('settingsTpl', data.result);
            $('#settingsInfo').html(html);
        }
    })
})