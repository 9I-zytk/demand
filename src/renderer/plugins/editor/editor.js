/**
 * Created by 9i
 * @Date 2018/1/18
 */
'use strict'
import TextCursor from './components/textCursor'

/**
 * @description Creates a new Editor.
 * @class Editor
 * @author 9i <https://github.com/9I-zytk>
 */
class Editor {
  /*
  * Create a Editor
  * @constructor
  * @param {object} Editor option
  */
  constructor (option) {
    this.width = option.width
    this.height = option.height
    this.id = undefined
    this.fontSize = option.fontSize || 16
    // 光标闪烁参数
    this.blink_on = 500
    this.blink_off = 500
  }
  /*
  * init a Editor 渲染编辑器之前的一些初始化
  * @param {id} Editor id
  */
  _init (id) {
    this.id = id
    this.canvas = document.getElementById(id)
    this.context = this.canvas.getContext('2d')
    this.context.font = this.fontSize + 'px sans-serif'
    this.cursor = new TextCursor()
    this.saveDrawing()
  }
  /*
  * render a Editor 渲染编辑器
  * @param {number} Editor id
  */
  render (id) {
    this._init(id)
    this.canvas.setAttribute('class', 'editor')
    // 绑定事件
    this.eventHandler()
  }
  /*
  * destroy Editor 销毁编辑器
  */
  destroy () {

  }
  /*
  * 保存画布像素数据
  * @return {Editor}  返回当前Editor实例
  */
  saveDrawing () {
    this.drawingImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    return this
  }
  /*
  * canvas绑定事件
  * @return {Editor}  返回当前Editor实例
  */
  eventHandler () {
    const _this = this
    this.canvas.onmousedown = function (e) {
      const x = Math.round(e.x || e.clientX)
      const y = Math.round(e.y || e.clientY)
      const loc = _this.windowToCanvas(_this.canvas, x, y)
      _this.moveCursor(loc)
    }
    return this
  }
  /*
  * 移动光标
  * @param {object} - 当前鼠标落点相对画布位置对象,{x : x，y : y}.
  * @return {Editor}  返回当前Editor实例
  */
  moveCursor (loc) {
    this.cursor.erase(this.context, this.drawingImageData)
    this.cursor.draw(this.context, loc.x, loc.y)
    !this.blinkInterval && this.blinkCursor()
    return this
  }
  /*
  * 获取鼠标相对画布位置
  * @param {canvas} - 当前画布对象
  * @param {x} - 当前鼠标落点X坐标
  * @param {y} - 当前鼠标落点Y坐标
  * @return {object}  返回当前鼠标落点相对画布位置对象,{x : x，y : y}
  */
  windowToCanvas (canvas, x, y) {
    const bbox = canvas.getBoundingClientRect()
    return {
      x: Math.round(x - bbox.left * (canvas.width / bbox.width)),
      y: Math.round(y - bbox.top * (canvas.height / bbox.height))
    }
  }
  /*
  * 获取鼠标相对画布位置
  * @param {canvas} - 当前画布对象
  * @param {x} - 当前鼠标落点X坐标
  * @param {y} - 当前鼠标落点Y坐标
  * @return {object}  返回当前鼠标落点相对画布位置对象,{x : x，y : y}
  */
  blinkCursor () {
    const _this = this
    this.blinkInterval = setInterval(function (e) {
      _this.cursor.erase(_this.context, _this.drawingImageData)
      setTimeout(e => {
        _this.cursor.draw(_this.context, _this.cursor.left, _this.cursor.top + _this.cursor.getHeight(_this.context))
      }, _this.blink_off)
    }, _this.blink_on + _this.blink_off)
  }
}
export default Editor
