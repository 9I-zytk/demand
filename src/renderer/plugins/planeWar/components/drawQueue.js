/**
 * Created by 9i
 * @Date 2017/11/29
 */
export default class Queue {
  constructor () {
    // 绘制对象列表
    this._queue = []
  }
  push (obj) {
    this._queue.push(obj)
  }
  remove (obj) {
    for (let i = 0; i < this.length(); i++) {
      let temp = this._queue[i]
      if (temp === obj) {
        this._queue.splice(i, 1)
        return i
      }
    }
  }
  length () {
    return this._queue.length
  }
  draw () {
    this._queue.forEach(function (item) {
      item.draw()
    })
  }
  getClickItem (x, y) {
    const _this = this
    for (let i = 0; i < _this.length(); i++) {
      _this._queue[i].createPath()
      if (_this._queue[i].isClick(x, y)) {
        return _this._queue[i]
      }
    }
  }
  forEach (callback) {
    const _this = this
    for (let i = _this.length() - 1; i > 0; i--) {
      const item = _this._queue[i]
      callback(item)
    }
    // this._queue.forEach(callback)
  }
  clear () {
    this._queue.length = 0
  }
}
