define(['jquery', 'template'], function ($, template) {

    // 调用接口，获取讲师信息
    $.ajax({
        type: 'get',
        url: '/api/teacher',
        dataType: 'json',
        success: function (data) {
            var html = template('teacherTpl', { list: data.result });
            $('#teacherInfo').html(html)
        }
    })

});