/**
 * Created by 9i
 * @Date 2018/1/18
 */
'use strict'
/*
* 编辑器光标类
* @class TextCursor
*/
export default class TextCursor {
  /*
  * Create a Cursor
  * @constructor
  * @param {number} width - 光标宽度
  * @param {String} fillStyle - 光标颜色
  */
  constructor (width, fillStyle) {
    this.width = width || 2
    this.fillStype = fillStyle || 'rgb(0, 0, 0, 0.5)'
    // 光标位置信息
    this.left = 0
    this.top = 0
  }
  /*
  * 获取光标高度
  * @param {context} context - canvas.context 对象
  * @return {number}  返回光标高度
  *
  */
  getHeight (context) {
    const h = context.measureText('W').width
    return h + h / 6
  }
  /*
  * 画光标路径
  * @param {context} context - canvas.context 对象
  */
  createPath (context) {
    !this.height && (this.height = this.getHeight(context))
    context.beginPath()
    context.rect(this.left, this.top, this.width, this.height)
    context.closePath()
  }
  /*
  * 绘制光标到画布
  * @param {context} context - canvas.context 对象
  * @param {number} left - 光标落点位置X坐标
  * @param {number} bottom - 光标落点位置Y坐标
  */
  draw (context, left, bottom) {
    context.save()
    this.left = left
    this.top = bottom - this.getHeight(context)
    this.createPath(context)
    context.fillStyle = this.fillStype
    context.fill()
    context.restore()
  }
  /*
  * 擦除光标
  * @param {context} context - canvas.context 对象
  * @param {imageData} imageData - canvas 保存的画布图像数据
  */
  erase (context, imageData) {
    context.putImageData(imageData, 0, 0, this.left, this.top, this.width, this.getHeight(context))
  }
}
