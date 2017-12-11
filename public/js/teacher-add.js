define(['jquery', 'template', 'util','datepicker','language'], function ($, template, util) {
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
    function submitForm(url) {
        $('#teacherBtn').click(function(){
            $.ajax({
                type:'post',
                url:url,
                data:$('#teacherForm').serialize(),
                dataType:'json',
                success:function(data){
                    if(data.code==200){
                        location.href='/teacher/list';
                    }
                }
            })
        })
    }



})