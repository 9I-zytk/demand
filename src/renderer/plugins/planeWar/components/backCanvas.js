/**
 * Created by 9i
 * @Date 2017/11/23
 */
'use strict'
class container {
  constructor (img, context, x, y, w, h, speed) {
    // 背景图片
    this.img = img
    // 坐标
    this.x = x
    this.y = y
    // 大小
    this.w = w
    this.h = h
    // 速度
    this.speed = speed
    // 引用
    this.context = context
  }
  move () {
    const y = this.speed / this.fps
    if (this.y >= this.h) {
      this.y = 0 - this.h
    }
    this.y += y
  }
  draw () {
    this.context.drawImage(this.img, this.x, this.y, this.w, this.h)
    // 调用移动方法
    this.move()
  }
}
export default container
