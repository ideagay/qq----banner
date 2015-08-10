/**
 * Created by Administrator on 2015/8/10.
 */
(function($){
    $.fn.fillData=function(options) {
        $.fn.defaultParameter={
            jsonUrl:""
        }
        var opts= $.extend({}, $.fn.defaultParameter,options); //参数
        var jsonUrl=opts.jsonUrl; //获取请求地址
        return this.each(function() {
            var $this=$(this);
            function fill(){
                //获取各部分模板
                var tpl_main = $(".slider-main ul",$this).html().replace(/^\s*/, '').replace(/\s*$/, '');
                var tpl_title = $(".slider-title ul",$this).html().replace(/^\s*/, '').replace(/\s*$/, '');
                var tpl_smImg = $(".slider-smImg ul",$this).html().replace(/^\s*/, '').replace(/\s*$/, '');

                //定义最终输出html的变量
                var out_main = [];
                var out_title = [];
                var out_smImg = [];

                $.ajax({
                    type: "GET",
                    url: jsonUrl,
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        var _data = data.data;
                        for (var i = 0; i < _data.length; i++) {
                            var _html_main = tpl_main.replace(/\{\{index}}/g, _data[i].img);
                            var _html_title = tpl_title.replace(/\{\{index}}/g, _data[i].img).replace(/\{\{h2}}/g, _data[i].h2);
                            var _html_smImg = tpl_smImg.replace(/\{\{index}}/g, _data[i].img);
                            out_main.push(_html_main);
                            out_title.push(_html_title);
                            out_smImg.push(_html_smImg);
                        }
                        //最终写入模版
                        $(".slider-main ul",$this).html(out_main);
                        $(".slider-title ul",$this).html(out_title);
                        $(".slider-smImg ul",$this).html(out_smImg);
                    },
                    error:function(jqXHR,textStatus,errorThrown){
                        $this.html(errorThrown )
                    }
                })
            }
            fill();
        });
    }
})(jQuery)
