/**
 * Created by 9i
 * @Date 2017/11/23
 */
'use strict'
class Plane {
  constructor (img, context, x, y, w, h) {
    this.img = img
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.context = context
    // 当前血量
    this._hitPoint = 100
    // 最大血量
    this._hitPointMax = 100
    // 速度
    this.speed = 30
  }
  init () {

  }
  draw (fps) {
    if (this._hitPoint > 0) {
      this.context.drawImage(this.img, this.x, this.y, this.w, this.h)
      this.move(fps)
    }
  }
  move (fps) {

  }
  // 得到当前飞机的矩形
  getRect () {
    return {
      x: this.x,
      y: this.y + this.h * 0.2,
      w: this.w,
      h: this.h * 0.6
    }
  }
  collisionCheck (item) {
    const _self = this.getRect()
    const collision = item.getRect()
    return !(_self.x + _self.w < collision.x || _self.x > collision.x + collision.w ||
    _self.y > collision.y + collision.h || _self.y + _self.h < collision.y)
  }
}
export default Plane
