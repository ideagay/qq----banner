/**
 * Created by Administrator on 2015/6/18.
 */
(function($){
    $.fn.sliderBanner=function(options){
        //设置默认参数
        $.fn.sliderBanner.defaultParameter={
            autoPlay:true,   //是否自动滚动
            speed :6000 //滚动速度
            //slideMain:"slider-main",  //大图区域
            //sliderTitle:"slider-title", //图片描述区域
            //sliderSwitch:"slider-switch", //左右控制区域
            //sliderSmImg:"slider-smImg" //缩略图区域
        };
        var opts= $.extend({}, $.fn.sliderBanner.defaultParameter,options);
        var clickNext=$(".slider-switch .btn-next",$(this)); //下一张按钮
        var clickPrev=$(".slider-switch .btn-prev",$(this)); //上一张按钮
        var sliderMain=$(".slider-main",$(this)); //大图显示区域
        var sliderSmImg=$(".slider-smImg .smImg-i",$(this)); //缩略图
        var slideLength=$(".slider-main .main-i",$(this)).length;  //图片数量
        var speed=opts.speed;   //自动播放速度
        var autoPlay=opts.autoPlay; //是否自动播放
        var timer;
        //编写翻页等方法
        return this.each(function() {
            var $this = $(this);
            //鼠标移过小图切换大图
            function showImg(n) {
                //先清除所有的当前状态
                $this.find(".main-i").removeClass("main-i-active");
                $this.find(".title-i").removeClass("title-i-active");
                $this.find(".smImg-i").removeClass("smImg-i-active");
                //给当前经过元素加上显示状态
                addC(n);
            }
            function removeC(cur) {  //移除当前状态
                $this.find(".main_" + cur).removeClass("main-i-active");
                $this.find(".title_" + cur).removeClass("title-i-active");
                $this.find(".smImg_" + cur).removeClass("smImg-i-active");
            }

            function addC(cur) {   //添加当前状态
                $this.find(".main_" + cur).addClass("main-i-active");
                $this.find(".title_" + cur).addClass("title-i-active");
                $this.find(".smImg_" + cur).addClass("smImg-i-active");
            }

            function goPrev(){  //上一张
                var cur = $this.find(".smImg-i-active").attr("index");
                if (cur == 1) {
                    addC(slideLength);
                }
                removeC(cur);
                cur--;
                addC(cur);
            }

            function goNext(){  //下一张
                var cur = $this.find(".smImg-i-active").attr("index");
                if (cur == slideLength) {
                    addC(1);
                }
                removeC(cur);
                cur++;
                addC(cur);
            }

            //下一张按钮绑定
            clickNext.click(function(){
                goNext();
            })

            //下一张按钮绑定
            clickPrev.click(function(){
                goPrev();
            })

            function play(){  //自动播放
                timer = setTimeout(function () {
                    goNext();
                    play();  //递归调用
                }, speed);
            }

            function stop(){
                clearTimeout(timer); //停止自动播放
            }

            sliderSmImg.hover(function(){
                var index=$(this).attr("index");
                showImg(index);
            })

            //初始化调用
            showImg(1);  //默认先显示第一张图片
            if(autoPlay){ //设置自动播放
                play();
                //鼠标停留大图区域停止自动播放，移开自动播放
                sliderMain.hover(function(){
                    stop();
                },function(){
                    play();
                })
            }else{

            }

        })
    }
})(jQuery);
