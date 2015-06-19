/**
 * Created by Administrator on 2015/6/18.
 */

function sliderBanner(){

   var timer;

    this.slider=function() {
        //获取各部分模板
        var tpl_main = $(".slider-main ul").html().replace(/^\s*/, '').replace(/\s*$/, '');
        var tpl_title = $(".slider-title ul").html().replace(/^\s*/, '').replace(/\s*$/, '');
        var tpl_smImg = $(".slider-smImg ul").html().replace(/^\s*/, '').replace(/\s*$/, '');

        //定义最终输出html的变量
        var out_main = [];
        var out_title = [];
        var out_smImg = [];

        $.ajax({
            type: "GET",
            url: "json/banner.json",
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
                $(".slider-main ul").html(out_main);
                $(".slider-title ul").html(out_title);
                $(".slider-smImg ul").html(out_smImg);
            }
        })
    }

//鼠标移过小图切换大图
     this.showImg=function(n) {
        //先清除所有的当前状态
        $(".main-i").removeClass("main-i-active");
        $(".title-i").removeClass("title-i-active");
        $(".smImg-i").removeClass("smImg-i-active");

        //给当前经过元素加上显示状态
       addC(n);

    }

    function removeC(cur) {  //移除当然状态
        $("#main_" + cur).removeClass("main-i-active");
        $("#title_" + cur).removeClass("title-i-active");
        $("#smImg_" + cur).removeClass("smImg-i-active");
    }

    function addC(cur) {   //添加当前状态
        $("#main_" + cur).addClass("main-i-active");
        $("#title_" + cur).addClass("title-i-active");
        $("#smImg_" + cur).addClass("smImg-i-active");
    }

    this.goPrev=function() {  //向左翻
        var cur = $(".smImg-i-active").attr("index");
        if (cur == 1) {
            addC(10);
        }
        removeC(cur);
        cur--;
        addC(cur);
    }

    this.goNext=function() {  //向右翻
        var cur = $(".smImg-i-active").attr("index");
        if (cur == 10) {
            addC(1);
        }
        removeC(cur);
        cur++;
        addC(cur);
    }

    this.play=function() {  //自动播放
        timer = setTimeout(function () {
            this.goNext();
            this.play();  //递归调用
        }, 4000);
    }

   this.stop=function() {
        clearTimeout(timer); //停止自动播放
    }


    this.slider(); //填充数据
    this.showImg(1);  //开始显示第一张
    this.play();  //自动播放

};