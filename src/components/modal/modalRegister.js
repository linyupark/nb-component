/**
 * 直接js调用唤起modal的函数
 */
export default async function(type, opts = {}) {
  // 获取实际配置
  const options = {
    el: 'nb-modal',
    type,
    title: '',
    content: '',
    position: 'center',
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
  el.setAttribute('type', options.type);
  el.setAttribute('theme', options.theme);
  return await el.show(options.type, options);
};
