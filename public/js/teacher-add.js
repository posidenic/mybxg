define(['jquery', 'template', 'util', 'datepicker', 'language', 'form', 'validate'], function ($, template, util) {
    // console.log(222);

    var tcId = util.queryString('tc_id');

    if (tcId) {
        // tcId存在，此时是编辑操作
        $.ajax({
            type: 'get',
            url: '/api/teacher/edit',
            dataType: 'json',
            data: {
                tc_id: tcId
            },
            success: function (data) {
                data.result.oprate = '编辑讲师';
                var html = template('teacherTpl', data.result);
                $('#teacherInfo').html(html);

                // 处理表单提交
                submitForm('/api/teacher/update');
            }
        })
    } else {
        // tcId不存在，此时是添加操作
        var html = template('teacherTpl', { oprate: '添加讲师' });
        $('#teacherInfo').html(html);

        // 处理表单提交
        submitForm('/api/teacher/add');

    }

    // 实现表单提交
    // function submitForm(url) {
    //     $('#teacherBtn').click(function () {
    //         $.ajax({
    //             type: 'post',
    //             url: url,
    //             data: $('#teacherForm').serialize(),
    //             dataType: 'json',
    //             success: function (data) {
    //                 if (data.code == 200) {
    //                     location.href = '/teacher/list';
    //                 }
    //             }
    //         })
    //     })
    // }


    // 使用form插件与validate插件实现表单的验证与提交功能
    function submitForm(url) {
        $('#teacherForm').validate({
            sendForm: false,
            valid: function () {
                $(this).ajaxSubmit({
                    type: 'post',
                    url: url,
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {
                            location.href = '/teacher/list';
                        }
                    }
                })
            },
            description: {
                tcName: {
                    required: '用户名不能为空'
                },
                tcPass: {
                    required: '密码不能为空',
                    pattern: '密码必须为6位数字'
                },
                tcJoinDate: {
                    required: '入职日期不能为空'
                }
            }
        })






    }




})