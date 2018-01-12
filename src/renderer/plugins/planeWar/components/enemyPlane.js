/**
 * Created by 9i
 * @Date 2017/11/23
 */
'use strict'
import Plane from './plane'
export default class enemyPlane extends Plane {
  constructor (img, context, x, y, w, h) {
    super(img, context, x, y, w, h)
    this.speed = 0
  }
  draw (fps) {
    super.draw(fps)
  }
  move (fps) {
    this.y += this.speed / fps
  }
  beingHit (hurt) {
    this._hitPoint += -1 * hurt
  }
}
