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
  }
  /*
  * init a Editor 渲染编辑器之前的一些初始化
  * @param {id} Editor id
  */
  _init (id) {
    this.id = id
    this.canvas = document.getElementById(id)
    this.context = this.canvas.getContext('2d')
    this.cursor = new TextCursor()
  }
  /*
  * render a Editor 渲染编辑器
  * @param {id} Editor id
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
  * destroy Editor 销毁编辑器
  */
  saveDrawing () {
    this.drawingImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    return this
  }
  eventHandler () {
    const _this = this
    this.canvas.onmousedown = function (e) {
      const x = e.x || e.clientX
      const y = e.y || e.clientY
      _this.saveDrawing()
      const loc = _this.windowToCanvas(_this.canvas, x, y)
      _this.moveCursor(loc)
    }
  }
  moveCursor (loc) {
    this.cursor.erase(this.context, this.drawingImageData)
    this.cursor.draw(this.context, loc.x, loc.y)
  }
  windowToCanvas (canvas, x, y) {
    const bbox = canvas.getBoundingClientRect()
    return {
      x: x - bbox.left * (canvas.width / bbox.width),
      y: y - bbox.top * (canvas.height / bbox.height)
    }
  }
}
export default Editor
