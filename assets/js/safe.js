function checkParent(element, classNames) {
    while (element) {
        if (element.classList && classNames.some(cn => element.classList.contains(cn))) {
            return true;
        }
        element = element.parentElement;
    }
    return false;
}

// 添加需要排除的a标签类名class
var excludedClasses = [
    'link_item',            // 友链 & 留言
    'friend-item',          // 首页 - 友情链接
    'contact-item',         // 首页 - 个人档案
    'footer-item',          // footer
    'cf-article-title',     // 友链文章
    'search-btn',           // 搜索按钮
    'safe-item-auto-load'   // 其他 博客记录
]; 

window.addEventListener('load', (event) => {
    document.body.addEventListener('click', function(e) {
        let target = e.target;
        while (target && target.nodeName !== 'A') {
            target = target.parentNode;
        }
        if (target && target.nodeName === 'A' &&
            !checkParent(target, excludedClasses) &&
            !target.href.includes('gorpeln.top') &&
            !target.href.includes('gorpeln.eu.org') &&
            !target.href.includes('202090.xyz') &&
            !target.href.includes('lab.gorpeln.top') &&
            !target.href.includes('github.com') &&
            target.hostname !== window.location.hostname) {
            e.preventDefault();
            let encodedUrl = btoa(target.href); // Base64 encode the URL
            let url = '/go-wild?target=' + encodedUrl;
            window.open(url, '_blank');
        }
    });
});