/**
 * Created by 9i
 * @Date 2017/11/29
 */
'use strict'
class Button {
  constructor (img, context, x, y, w, h) {
    this.img = img
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.context = context
    this.clickHandle = function () {}
  }
  createPath () {
    this.context.beginPath()
    this.context.rect(this.x, this.y, this.w, this.h)
    this.context.closePath()
  }
  isClick (x, y) {
    return this.context.isPointInPath(x, y)
  }
  addClick (click) {
    if (typeof click === 'function') {
      this.clickHandle = click
    }
  }
  draw () {
    this.context.drawImage(this.img, this.x, this.y, this.w, this.h)
  }
}
export default Button
