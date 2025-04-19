/**
 * 注册一个自定义指令，用于在元素上添加防抖功能
 * @param {Object} app - Vue 3 应用实例
 */
export const directives = (app: any) => {
  // 注册一个名为 'debounce' 的自定义指令
  app.directive('debounce', {
    /**
     * 在元素挂载后绑定事件监听器
     * @param {HTMLElement} el - 指令所绑定的元素
     * @param {Object} binding - 指令的绑定值
     */
    mounted(el: any, binding: any) {
      // 检查绑定值是否为函数
      if (typeof binding.value !== 'function') return;
      // 初始化定时器和事件处理函数
      el.timer = null;
      el.handler = function () {
        // 如果定时器存在，则清除它
        if (el.timer) {
          clearTimeout(el.timer);
        }
        // 设置新的定时器，在指定延迟后执行绑定的函数
        el.timer = setTimeout(() => {
          binding.value.apply(this, arguments);
        }, 600);
      };
      // 为元素添加点击事件监听器
      el.addEventListener('click', el.handler);
    },
    /**
     * 在元素卸载前移除事件监听器
     * @param {HTMLElement} el - 指令所绑定的元素
     */
    beforeUnmount(el: any) {
      // 如果定时器存在，则清除它并重置为 null
      if (el.timer) {
        el.timer = null;
        clearTimeout(el.timer);
      }
      // 移除元素的点击事件监听器
      el.removeEventListener('click', el.handler);
    },
  });
};

export const common = {
  sex: function(type:number) {
    if(type === 1) return '男'
    else if(type === 2) return '女'
    else return ''
  }
}