// 基准大小
const baseSize = 75;
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750;
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 2) + 'px';
}

function pageShow(event) {
  if (event.persisted) {
    setTimeout(function() {
      setRem();
    }, 10);
  }
}

// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.addEventListener('resize', setRem, false);
window.addEventListener('pageShow', pageShow, false);

// 禁用
function noRem() {
  document.documentElement.removeAttribute('font-size');
  window.removeEventListener('resize', setRem, false);
  window.removeEventListener('pageShow', pageShow, false);
}

export { setRem, noRem };
