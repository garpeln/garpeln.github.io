function checkParent(element, classNames) {
    while (element) {
        if (element.classList && classNames.some(cn => element.classList.contains(cn))) {
            return true;
        }
        element = element.parentElement;
    }
    return false;
}
var excludedClasses = ['card-link', 'friend-item', 'contact-item', 'footer-item']; // 添加需要排除的a标签类名class
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