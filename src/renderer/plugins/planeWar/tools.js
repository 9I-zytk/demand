/**
 * Created by 9i
 * @Date 2017/11/24
 */
/**
 * requestAnimationFrame兼容处理
 */
(function () {
  'use strict'
  let lastTime = 0
  const vendors = ['webkit', 'moz']
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
      window[vendors[x] + 'CancelRequestAnimationFrame']
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      const currTime = new Date().getTime()
      const timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
      const id = window.setTimeout(function () {
        const time = currTime + timeToCall
        callback(time)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
}())
const Tools = {
  fps_lastTime: 0
}
Tools.requestAnimationFrame = function (callback, isPause) {
  isPause = isPause || false
  let spf = 1000 / 60
  const thisTime = new Date().getTime()
  spf = Tools.fps_lastTime ? (thisTime - Tools.fps_lastTime) : spf
  Tools.fps_lastTime = thisTime
  callback && window.requestAnimationFrame(function () {
    callback(thisTime, 1000 / spf)
  })
}
export default Tools
