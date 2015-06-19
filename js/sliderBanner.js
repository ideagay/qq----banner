/**
 * Created by Administrator on 2015/6/18.
 */

function sliderBanner(){

   var timer;

    this.slider=function() {
        //��ȡ������ģ��
        var tpl_main = $(".slider-main ul").html().replace(/^\s*/, '').replace(/\s*$/, '');
        var tpl_title = $(".slider-title ul").html().replace(/^\s*/, '').replace(/\s*$/, '');
        var tpl_smImg = $(".slider-smImg ul").html().replace(/^\s*/, '').replace(/\s*$/, '');

        //�����������html�ı���
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

                //����д��ģ��
                $(".slider-main ul").html(out_main);
                $(".slider-title ul").html(out_title);
                $(".slider-smImg ul").html(out_smImg);
            }
        })
    }

//����ƹ�Сͼ�л���ͼ
     this.showImg=function(n) {
        //��������еĵ�ǰ״̬
        $(".main-i").removeClass("main-i-active");
        $(".title-i").removeClass("title-i-active");
        $(".smImg-i").removeClass("smImg-i-active");

        //����ǰ����Ԫ�ؼ�����ʾ״̬
       addC(n);

    }

    function removeC(cur) {  //�Ƴ���Ȼ״̬
        $("#main_" + cur).removeClass("main-i-active");
        $("#title_" + cur).removeClass("title-i-active");
        $("#smImg_" + cur).removeClass("smImg-i-active");
    }

    function addC(cur) {   //��ӵ�ǰ״̬
        $("#main_" + cur).addClass("main-i-active");
        $("#title_" + cur).addClass("title-i-active");
        $("#smImg_" + cur).addClass("smImg-i-active");
    }

    this.goPrev=function() {  //����
        var cur = $(".smImg-i-active").attr("index");
        if (cur == 1) {
            addC(10);
        }
        removeC(cur);
        cur--;
        addC(cur);
    }

    this.goNext=function() {  //���ҷ�
        var cur = $(".smImg-i-active").attr("index");
        if (cur == 10) {
            addC(1);
        }
        removeC(cur);
        cur++;
        addC(cur);
    }

    this.play=function() {  //�Զ�����
        timer = setTimeout(function () {
            this.goNext();
            this.play();  //�ݹ����
        }, 4000);
    }

   this.stop=function() {
        clearTimeout(timer); //ֹͣ�Զ�����
    }


    this.slider(); //�������
    this.showImg(1);  //��ʼ��ʾ��һ��
    this.play();  //�Զ�����

};