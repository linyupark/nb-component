/**
 * 直接js调用唤起toast的函数
 */
export default async function(message, opts = {}) {
  // 获取实际配置
  const options = {
    el: 'nb-toast',
    duration: 2000,
    position: 'center',
    maxLength: 480,
    theme: 'default',
    ...opts
  };
  // 组件 dom
  let el = document.querySelector(options.el);
  // 检查是否已经有组件存在页面上
  if (!el) {
    let newEl = document.createElement(options.el);
    document.body.appendChild(newEl);
    el = await new Promise(resolve => setTimeout(resolve, 100, newEl));
  }
  el.setAttribute('duration', options.duration);
  el.setAttribute('position', options.position);
  el.setAttribute('max-length', options.maxLength);
  el.setAttribute('theme', options.theme);
  return await el.show(message);
};
