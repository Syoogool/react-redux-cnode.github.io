export function debounce (fn, delay) {
  // 持久化一个定时器 timer
  let timer = null
  // 闭包函数可以访问 timer
  return function () {
    // 通过 'this' 和 'arguments'
    // 获得函数的作用域和参数
    let context = this
    let args = arguments
    // 如果事件被触发，清除 timer 并重新开始计时
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 固定长度数字前面补零填充
 */
export function prefixInteger (num, length) {
  return ('000000000000' + num).substr(-length)
}

/**
 * 日期格式化
 */
export function format (t) {
  let year = t.getFullYear()
  let month = t.getMonth() + 1
  let day = t.getDate()
  let hours = t.getHours()
  let minutes = t.getMinutes()
  let seconds = t.getSeconds()
  let milliseconds = t.getMilliseconds()

  return year + '-' + prefixInteger(month, 2) + '-' + prefixInteger(day, 2) + 'T' +
    prefixInteger(hours, 2) + ':' + prefixInteger(minutes, 2) + ':' +
    prefixInteger(seconds, 2) + '.' + milliseconds + 'Z'
}
