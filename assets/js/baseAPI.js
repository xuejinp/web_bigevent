// 每次调用get psot ajax的时候会先调用ajaxPrefilter函数
$.ajaxPrefilter(function(options){
    console.log(options.url)
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})