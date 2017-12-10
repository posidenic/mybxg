define(['jquery', 'template'], function ($, template) {

    // 调用接口，获取讲师信息
    $.ajax({
        type: 'get',
        url: '/api/teacher',
        dataType: 'json',
        success: function (data) {
            var html = template('teacherTpl', { list: data.result });
            $('#teacherInfo').html(html);

            // 讲师启用/注销功能
            $('.disbleOrEnable').click(function () {
                var that = this;
                var td = $(this).parent('td');
                var tcId = td.attr('data-tcId');
                var tcStatus = td.attr('data-tcStatus');
                $.ajax({
                    type: 'post',
                    url: '/api/teacher/handle',
                    dataType: 'json',
                    data: { tc_id: tcId, tc_status: tcStatus },
                    success: function (data) {
                        if (data.code == 200) {
                            td.attr('data-tcStatus', data.result.tc_status);
                            if (data.result.tc_status == 0) {
                                $(that).text('注销')
                            } else {
                                $(that).text('启用')

                            }
                        }
                    }
                })
            });
        }
    });
});