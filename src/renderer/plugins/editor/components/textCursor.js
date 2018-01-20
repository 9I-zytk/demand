/**
 * Created by 9i
 * @Date 2018/1/18
 */
'use strict'
/*
* 编辑器光标类
*/
export default class TextCursor {
  /*
  * @param
  * width 光标宽度
  * fillStyle 光标颜色
  * */
  constructor (width, fillStyle) {
    this.width = width || 2
    this.fillStype = fillStyle || 'rgb(0, 0, 0, 0.5)'
    // 光标位置信息
    this.left = 0
    this.top = 0
  }
  getHeight (context) {
    const h = context.measureText('W').width
    return h + h / 6
  }
  createPath (context) {
    !this.height && (this.height = this.getHeight(context))
    context.beginPath()
    context.rect(this.left, this.top, this.width, this.height)
    context.closePath()
  }
  draw (context, left, bottom) {
    context.save()
    this.left = left
    this.top = bottom - this.getHeight(context)
    this.createPath(context)
    context.fillStyle = this.fillStype
    context.fill()
    context.restore()
  }
  erase (context, imageData) {
    context.putImageData(imageData, 0, 0, this.left, this.top, this.width, this.getHeight(context))
  }
}
