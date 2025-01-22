document.addEventListener("DOMContentLoaded", function() {
    // 检查是否有黑夜模式的设置
    var darkMode = localStorage.getItem('darkMode');

    // 初始化主题
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // 获取桌面版主题切换按钮
    var themeToggleButton = document.getElementById('themeModel');


    // 定义一个函数来切换主题
    function toggleTheme() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            themeToggleButton.classList.remove('themeModelLight');
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            themeToggleButton.classList.add('themeModelLight');
        }
    }


    // 根据存储的 darkMode 设置按钮的初始样式
    if (darkMode === 'enabled') {
        themeToggleButton.classList.add('themeModelLight');
    } else {
        themeToggleButton.classList.remove('themeModelLight');
    }


    // 如果桌面版主题切换按钮存在，则添加点击事件监听器
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }


});