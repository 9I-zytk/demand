/**
 * Created by 9i
 * @Date 2018/1/23
 */
'use strict'
import TextLine from 'textLine'
/*
* 编辑器 编辑行
* @class Paragraph
*/
export default class Paragraph {
  /*
  * Create a Paragraph
  * @constructor
  * @param {object} context - canvas.context 对象
  * @param {object} loc - 当前鼠标落点相对画布位置对象,{x : x，y : y}.
  * @param {imageData} imageData - canvas 保存的画布图像数据
  * @param {cursor} cursor - 当前光标
  */
  constructor (context, loc, imageData, cursor) {
    this.context = context
    this.left = loc.x
    this.top = loc.y
    // 包含的文本行
    this.textLine = []
    // 当前编辑行
    this.activeLine = undefined
    this.cursor = cursor
    this.drawingImageData = imageData
  }
  moveCursorCloseTo (x, y) {
    const line = this.getLine(y)
    if (line) {
      line.caret = this.getColumn(line, x)
      this.activeLine = line
      this.moveCursor(line.getCaretX(this.context), line.bottom)
    }
  }
  /*
  * Create a Paragraph
  * @constructor
  * @param {TextLine} line - 添加TextLine对象
  */
  addLine (line) {
    this.textLine.push(line)
    this.activeLine = line
    this.moveCursor(this.left, this.top)
  }
  newLine () {

  }
  insert () {

  }
  isPointInside () {

  }
  /*
  * 移动光标
  * @param {object} - 当前鼠标落点相对画布位置对象,{x : x，y : y}.
  * @return {Paragraph}  返回当前Paragraph实例
  */
  moveCursor (x, y) {
    this.cursor.erase(this.context, this.drawingImageData)
    this.cursor.draw(this.context, x, y)
    !this.blinkInterval && this.blinkCursor()
    return this
  }
  /*
  * 根据Y坐标 查找对应行
  * @param {Y} - 当前鼠标落点相对画布位置Y坐标.
  * @return {TextLine}  返回传入Y坐标对应行
  */
  getLine (y) {
    let line
    for (let i = 0; i < this.textLine.length; i++) {
      line = this.textLine[i]
      if (y > line.top && y < line.bottom) {
        return line
      }
    }
    return line
  }
}
