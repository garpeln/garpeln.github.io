$(document).ready(function() {

    $(function() {
        $(window).scroll(function() {

            if ($(window).scrollTop() > 150) {
                $("#backtotop").addClass("showme");
                $("#qrcodeBtn").addClass("qrcodeMoveTop");
                $("#qrcode").addClass("qrcodeMoveTop");
                $("#themeModel").addClass("qrcodeMoveTopTop");
            } else {
                $("#backtotop").removeClass("showme");
                $("#qrcodeBtn").removeClass("qrcodeMoveTop");
                $("#qrcode").removeClass("qrcodeMoveTop");
                $("#themeModel").removeClass("qrcodeMoveTopTop");
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

/*
        document.addEventListener('click', function (event) {
            // 获取点击事件的目标元素
            var target = event.target;

            // 判断目标元素是否是链接
            if (target.tagName === 'A') {
                // 阻止默认的链接跳转行为
                // event.preventDefault();

                // 调用处理点击链接的方法
                handleLinkClick(target.href);
            }
        });

        function handleLinkClick(link) {
            // 提取主域名
            var domain = link.match(/^(?:https?:\/\/)?(?:www\.)?([^\/\?]+)/i);
            domain = domain && domain[1];

            // 提取 IP 地址
            var ipAddress = link.match(/^https?:\/\/(\d+\.\d+\.\d+\.\d+)/i);
            ipAddress = ipAddress && ipAddress[1];


            // 判断主域名是否为 "gorpeln.top"
            if (domain === "gorpeln.top" || ipAddress === "127.0.0.1") {
            } else {
                // 跳转到 target-page.html，传递真实链接作为参数
                window.location.href = "targetPage.html?redirectUrl=" + encodeURIComponent(link);
            }
        }

*/



