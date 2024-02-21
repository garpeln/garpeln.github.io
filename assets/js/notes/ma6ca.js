$(function() {
    var isAndroid = window.navigator.userAgent.toLowerCase().indexOf('android') > -1 || window.navigator.userAgent.toLowerCase().indexOf('adr') > -1;
    var isiOS = !!window.navigator.userAgent.toLowerCase().match(/\(i[^;]+;( u;)? cpu.+mac os x/);
    var isWeiXin = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
    var appUrl = "https://apps.apple.com/cn/app/id1495623965";
    var appUrl_bate = "https://gorpeln.top";

    // 浏览器支持跨域访问
    jQuery.support.cors = true;

    window.onload = requestDetailData();


    // 下载按钮点击
    $('.download').click(function() {
        if (isiOS) {
            window.location.href = appUrl;
            return;
        } else if (isAndroid) {
            if (isWeiXin) {
                // 应用宝

            }
            // 客户端暂不支持直接跳APP主页
            else {


            }
            window.location.href = appUrl;
            return;
        }
    });

    // Bate 下载按钮点击
    $('.bate_download').click(function() {
        if (isiOS) {
            window.location.href = appUrl_bate;
            return;
        } else if (isAndroid) {
            if (isWeiXin) {
                // 应用宝

            }
            // 客户端暂不支持直接跳APP主页
            else {


            }
            window.location.href = appUrl_bate;
            return;
        }
    });
});





function requestDetailData() {
    var $this = this;
    $.ajax({
        url: "https://itunes.apple.com/cn/lookup?id=1495623965",
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data) {
            var results = data.results;
            console.log(results);
            if (results.length) {
                var detail = results[0];
                //应用名称
                var trackName = detail.trackName;
                //bundleId
                var bundleId = detail.bundleId;
                //开发商
                var sellerName = detail.sellerName;
                //上架时间
                var releaseDate = detail.releaseDate;
                //版本号
                var version = detail.version;
                //版本发布时间
                var currentVersionReleaseDate = timeFormat(detail.currentVersionReleaseDate);
                //版本描述
                var releaseNotes = detail.releaseNotes;
                //应用logo
                var artworkUrl512 = detail.artworkUrl512;

                $("#app_version").text('最新版本：' + version + '丨更新时间：' + currentVersionReleaseDate);
                $("#app_version_2").text('最新版本：' + version + '丨更新时间：' + currentVersionReleaseDate);
                document.getElementById('logo').style.backgroundImage = "url(" + artworkUrl512 + ")";

            } else {
                $this.end();
            }
        },
        error: function(data) {
            $this.end()
        }
    });
}


function timeFormat(inputTime) {
    if (!inputTime && typeof inputTime !== 'number') {
        return '';
    }
    var localTime = '';
    inputTime = new Date(inputTime).getTime();
    const offset = (new Date()).getTimezoneOffset();
    localTime = (new Date(inputTime - offset * 60000)).toISOString();
    localTime = localTime.substr(0, localTime.lastIndexOf('T'));
    return localTime;
}