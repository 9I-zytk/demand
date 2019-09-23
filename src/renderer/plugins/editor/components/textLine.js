/**
 * Created by 9i
 * @Date 2018/1/22
 */

/*
* 编辑器 编辑行
* @class TextLine
*/
export default class TextLine {
  /*
* Create a TextLine
* @constructor
* @param {number} x - 新行X坐标
* @param {number} y - 新行Y坐标
*/
  constructor (x, y) {
    // 编辑行文本内容
    this.text = ''
    // 光标位置信息
    this.left = x
    this.bottom = y
    this.top = y
    this.caret = 0
  }
  /*
  * 获取行高度
  * @param {context} context - canvas.context 对象
  * @return {number}  返回高度
  *
  */
  getHeight (context) {
    const h = context.measureText('W').width
    return h + h / 6
  }
  /*
  * 获取行高度
  * @param {context} context - canvas.context 对象
  * @return {number}  返回宽度
  *
  */
  getWidth (context) {
    return context.measureText(this.text).width
  }
  /*
  *
  * @param {String} text - 插入文本
  * @return {TextLine}  返回当前对象
  *
  */
  insertText (text) {
    this.text = this.text.substr(0, this.caret) + text + this.text.substr(this.caret)
    this.caret += text.length
    return this
  }
  /*
  * 删除字符
  * @alias delCharacter
  *
  */
  removeCharacterBeforeCaret () {
    if (this.caret === 0) return this
    this.text = this.text.substr(0, this.caret - 1) + this.text.substr(this.caret)
    this.caret--
    return this
  }
  /*
  * 删除字符
  * @alias removeCharacterBeforeCaret
  * @return {TextLine}  返回当前对象
  */
  delCharacter () {
    return this.removeCharacterBeforeCaret()
  }
  /*
  * 绘制
  * @param {context} context - canvas.context 对象
  * @return {TextLine}  返回当前对象
  */
  draw (context) {
    context.save()
    context.textAlign = 'start'
    context.textBaseline = 'bottom'

    context.strokeText(this.text, this.left, this.bottom)
    context.fillText(this.text, this.left, this.bottom)

    context.restore()
    return this
  }
  /*
  * 擦除编辑行
  * @param {context} context - canvas.context 对象
  * @param {imageData} imageData - canvas 保存的画布图像数据
  * @return {TextLine}  返回当前对象
  */
  erase (context, imageData) {
    context.putImageData(imageData, 0, 0)
    return this
  }
}
