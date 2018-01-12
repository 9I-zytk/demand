/**
 * Created by 9i
 * @Date 2017/12/5
 */
import Plane from './plane'
export default class OurPlane extends Plane {
  constructor (img, context, x, y, w, h) {
    super(img, context, x, y, w, h)
    // 方向
    this.isUp = false
    this.isDown = false
    this.isLeft = false
    this.isRight = false
  }
  draw (fps) {
    super.draw(fps)
  }
  move (fps) {
    const v = this.speed / fps
    let x, y
    x = 0
    y = 0
    // if(isUp && !isDown && !isLeft && !isRight) {// 上
    //   if (this.y > this.range[1]) this.y -= v
    // }else if(!isUp && !isDown && !isLeft && isRight) {// 右
    //   if(this.y < this.range[2]) this.x += v
    // }else if(!isUp && isDown && !isLeft && !isRight) {// 下
    //   if(this.y < this.range[3]) this.y += v
    // }else if(!isUp && !isDown && isLeft && !isRight) {// 左
    //   if(this.x > this.range[0]) this.x_int -= v
    // }else if(isUp && !isDown && isLeft && !isRight) {// 上左
    //   if(this.y > this.range[1]) this.y -= v
    //   if(this.x > this.range[0]) this.x -= v
    // }else if(isUp && !isDown && !isLeft && isRight) { // 上右
    //   if(this.y > this.range[1]) this.y -= v
    //   if(this.x < this.range[2]) this.x_int += v
    // }else if(!isUp && isDown && isLeft && !isRight){// 下左
    //   if(this.y < this.range[3]) this.y += v
    //   if(this.x > this.range[0]) this.x -= v
    // }else if(!isUp && isDown && !isLeft && isRight){// 下右
    //   if(this.y < this.range[3]) this.y += v
    //   if(this.x < this.range[2]) this.x += v
    // }
    // 方向
    if (this.isUp) y = -v
    if (this.isDown) y = v
    if (this.isLeft) x = -v
    if (this.isRight) x = v
    // 边界检测
    if ((this.x < this.range[0]) && x < 0) x = 0
    if ((this.x > this.range[2]) && x > 0) x = 0
    if ((this.y < this.range[1]) && y < 0) y = 0
    if ((this.y > this.range[4]) && y > 0) y = 0
    this.y += y
    this.x += x
  }
  // 监听键盘事件
  keyDown (keyCode) {
    const _this = this
    switch (keyCode) {
      case 37:// 左
        _this.isLeft = true
        break
      case 38:// 上
        _this.isUp = true
        break
      case 39:// 右
        _this.isRight = true
        break
      case 40:// 下
        _this.isDown = true
        break
    }
  }
  keyUp (keyCode) {
    const _this = this
    switch (keyCode) {
      case 37:// 左
        _this.isLeft = false
        break
      case 38:// 上
        _this.isUp = false
        break
      case 39:// 右
        _this.isRight = false
        break
      case 40:// 下
        _this.isDown = false
        break
    }
  }
  mouseMove (x, y) {
    this.y = y - this.h / 2
    this.x = x - this.w / 2
  }
}
