$(document).ready(function() {

    $(function() {
        $(window).scroll(function() {

            if ($(window).scrollTop() > 150) {
                $("#backtotop").addClass("showme");
                $("#qrcodeBtn").addClass("qrcodeMoveTop");
                $("#qrcode").addClass("qrcodeMoveTop");
                $("#themeModel").addClass("themeModelMoveTop");
            } else {
                $("#backtotop").removeClass("showme");
                $("#qrcodeBtn").removeClass("qrcodeMoveTop");
                $("#qrcode").removeClass("qrcodeMoveTop");
                $("#themeModel").removeClass("themeModelMoveTop");
            }

        });

        $("#backtotop").click(function() {
            $('body,html').animate({ scrollTop: 0 }, 400);
            return false;
        });

        $("pre").addClass("prettyprint linenums");
        prettyPrint();
        $('.navbar-wrapper').stickUp();

    });



    //为超链接加上target='_blank'属性
    $('a[href^="http"]').each(function() {
        $(this).attr('target', '_blank');
    });




});

// 阅读进度条开始
$(window).scroll(function() {
    var a = $(window).scrollTop(),
    c = $(document).height(),
    b = $(window).height();
    scrollPercent = a / (c - b) * 100;
    scrollPercent = scrollPercent.toFixed(1);
    $("#percentageCounter").css({
        width: scrollPercent + "%"
    });
}).trigger("scroll");
//阅读进度条结束




