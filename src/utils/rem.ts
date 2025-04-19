// 基准大小
const baseSize = 37.5
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 1) + 'px'
}
// 初始化
setRem()
window.onresize = function () {
  setRem()
}
export default baseSize                                                                       