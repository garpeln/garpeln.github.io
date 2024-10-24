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





