document.addEventListener("DOMContentLoaded", function() {
  // 检查是否有黑夜模式的设置
  var darkMode = localStorage.getItem('darkMode');

  // 初始化主题
  if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  // 获取桌面版主题切换按钮
  var themeToggleButton = document.getElementById('themeModel');

  // 获取移动版主题切换按钮
  var themeOfMobileToggleButton = document.getElementById('themeModelOfmobile');

  // 定义一个函数来切换主题
  function toggleTheme() {
    if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    }
  }

  // 如果桌面版主题切换按钮存在，则添加点击事件监听器
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme);
  }

  // 如果移动版主题切换按钮存在，则添加点击事件监听器
  if (themeOfMobileToggleButton) {
    themeOfMobileToggleButton.addEventListener('click', toggleTheme);
  }
});