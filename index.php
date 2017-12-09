<?php

// include('./header.html');
// echo '<div>主页内容</div>';
// include('./footer.html');

// include('./views/main/index.html');

// 对路由进行一下判断，避免出现路由层数不够或者写错时页面跳转出现问题



// 默认目录名称
$dir='main';
// 默认文件名称
$filename="index";
// 处理url的路径
// 如果$_SERVER中存在'PATH_INFO'属性
if(array_key_exists('PATH_INFO',$_SERVER)){
// 使用 $_SERVER 可以获取到斜杠 / 后面的内容
$path = $_SERVER['PATH_INFO'];
// 去掉前面前面的第一个斜杠,得到main/index
$str=substr($path,1);
// 字符串分割
$ret = explode('/',$str);
if(count($ret)==2){
    $dir=$ret[0];
    $filename=$ret[1];
}else{
    $filename='login';
}
}
// 根据拿到的路径，再去嵌入对应的子页面
include('./views/'.$dir.'/'.$filename.'.html');

?>




