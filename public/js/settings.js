define(['jquery', 'template', 'uploadify', 'region'], function ($, template) {
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
                url:'/public/assets/jquery-region/region.json'
            });

        }
    })
})