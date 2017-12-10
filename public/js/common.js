
require(['jquery', 'template', 'cookie'], function ($, template) {


	// NProgress.start();
	// NProgress.done();
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	// 实现退出功能
	$('#logoutBtn').click(function () {

		$.ajax({
			type: 'post',
			url: '/api/logout',
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					// 跳转去登陆页面
					location.href = '/main/login';
				}
			}
		})
	})

	// 检测用户是否登录
	var flag = $.cookie('PHPSESSID');
	if (!flag && location.pathname != '/main/login') {
		location.href = 'main/login';
	}

	// 获取和设置用户头像信息
	var loginInfo = $.cookie('loginInfo')
	// 获取到的是字符串，所以要转换成对象才能使用
	// 使用短路运算，只有当用户信息存在时再转换，避免报错
	loginInfo = loginInfo && JSON.parse(loginInfo)
	// 根据得到的数据，设置用户的头像信息
	// $('.aside .profile img').attr('src', loginInfo.tc_avatar);
	// $('.aside .profile h4').html(loginInfo.tc_name);
	var tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';

	var html = template.render(tpl, loginInfo);
	$('.aside .profile').html(html);

})




