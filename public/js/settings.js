define(['jquery', 'template', 'ckeditor', 'uploadify', 'region', 'datepicker', 'language', 'validate', 'form'], function ($, template, CKEDITOR) {
    // 调用接口，获取个人信息
    $.ajax({
        type: 'get',
        url: '/api/teacher/profile',
        dataType: 'json',
        success: function (data) {
            console.log(111);

            // 根据获取到的个人信息，填充模板，添加到页面显示
            var html = template('settingsTpl', data.result);
            $('#settingsInfo').html(html);


            // 头像上传功能
            // $('#upfile').uploadify({
            //     swf: '/public/assets/uploadify/uploadify.swf',
            //     uploader: '/api/uploader/avatar',
            //     fileObjName: 'tc_avatar',
            //     onUploadSuccess: function (a, b) {
            //         console.log(2222);
            //     }
            // });


            // 处理省市县三级联动
            $('#pcd').region({
                url: '/public/assets/jquery-region/region.json'
            });

            // 处理富文本
            CKEDITOR.replace('editor', {
                toolbarGroups: [
                    { name: 'clipboard', groups: ['clipboard', 'undo'] },
                    { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] }
                ]
            });

            // 处理表单提交
            $('#settingsForm').validate({
                sendForm: false,
                valid: function () {
                    // 获取家乡信息
                    var p = $('#p').find('option:selected').text();
                    var c = $('#c').find('option:selected').text();
                    var d = $('#d').find('option:selected').text();
                    var hometown = p+'|'+c+'|'+d;

                    // 同步富文本内容
                    for (var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }

                    $(this).ajaxSubmit({
                        type: 'post',
                        url: '/api/teacher/modify',
                        data:{
                            tc_hometown:hometown
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data.code == 200) {
                                //   修改成功后，重新刷新当前页面
                                location.reload();
                            }
                        }
                    })
                }
            })

        }
    })
})