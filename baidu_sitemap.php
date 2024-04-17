?php
// 百度站长平台的API Token
$apiToken = 'ntu6ur21CBzDB8wR';

// 你的sitemap.xml地址
$siteMapUrl = 'https://gorpeln.top/sitemap.xml';

// 接口调用URL
$postUrl = 'http://data.zz.baidu.com/urls?site=https://gorpeln.top&token=' . $apiToken;

// 初始化curl会话
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $postUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'url=' . $siteMapUrl);

// 执行curl请求
$result = curl_exec($ch);

// 检查curl执行过程中是否有错误
if (curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
} else {
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($httpCode == 200) {
        echo 'Sitemap successfully pushed to Baidu';
    } else {
        echo 'Error pushing sitemap. HTTP code: ' . $httpCode;
    }
}

// 关闭curl会话
curl_close($ch);
?>