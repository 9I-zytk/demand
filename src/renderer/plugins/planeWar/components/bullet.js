/**
 * Created by 9i
 * @Date 2017/11/23
 */
'use strict'
/* 子弹 */
class Bullet {
  constructor (img, hurt, context) {
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.speedX = 0
    this.speedY = 100
    // 子弹造成伤害
    this.hurt = hurt
    this.img = img
    this.fps = 1000 / 60
    this.context = context
    this.isLife = true
  }
  getRect () {
    return {
      x: this.x,
      y: this.y + this.height * 0.2,
      w: this.width,
      h: this.height * 0.6
    }
  }
  move () {
    this.x -= this.speedX / this.fps
    this.y -= this.speedY / this.fps
    // 判断子弹的死亡
    if (this.y < 0 - this.height) {
      this.destroy()
    }
  }
  draw () {
    if (this.isLife) {
      this.context.drawImage(this.img, this.x, this.y, this.width, this.height)
      // 调用移动方法
      this.move()
    }
  }
  destroy () {
    this.isLife = false
  }
}
export default Bullet
