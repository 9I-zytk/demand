/**
 * Created by 9I
 * @Date 2019/9/24
 * @description
 */
import { generateHashId } from './util'
import ArrowDraw from './arrow'
export default class Arrow {
  constructor (container, option) {
    this.base = {
      canvasZIndex: -10,
      putToContainer: true,
      alertErrors: true
      // id: generateHashId(6, 'canvas')
    }
    this.container = container
    this.options = {...option, ...this.base}
    this.CanvasStorage = [[], [], []]
    this.arrowList = []
    this.init()
  }
  init () {
    let commonParentResult
    if (typeof this.container === 'string') {
      commonParentResult = document.querySelectorAll(this.container)
    } else {
      this.trowException('common parent must be specified')
    }
    if (commonParentResult.length > 0) {
      for (let i = 0; i < commonParentResult.length; i++) {
        this.CanvasStorage[0][i] = commonParentResult[i]
      }
      this.CanvasStorage[0].length = commonParentResult.length
    } else {
      this.trowException('common parent not found')
    }
    for (let iParent in this.CanvasStorage[0]) {
      this.CanvasStorage[0][iParent].style.position = 'relative'
      let canvas = document.createElement('canvas')
      canvas.innerHTML = ''
      canvas.style.position = 'absolute'
      canvas.style.left = '0px'
      canvas.style.top = '0px'
      canvas.style.zIndex = this.options.canvasZIndex
      canvas.width = this.CanvasStorage[0][iParent].scrollWidth
      canvas.height = this.CanvasStorage[0][iParent].scrollHeight

      // set identifier, if necessary
      canvas.id = generateHashId(6, 'canvas')

      if (this.options['canvasClass'] !== undefined) {
        canvas.className = this.options['canvasClass']
      }

      this.CanvasStorage[0][iParent].insertBefore(canvas, this.CanvasStorage[0][iParent].firstChild)
      this.CanvasStorage[1].push(canvas)
    }
  }
  trowException (ex) {
    if (this.options.alertErrors === true) {
      alert('CanvasArrows error: ' + ex)
    }
    throw new Error(ex)
  }
  // 箭头
  arrow (from, to, option) {
    for (let iParent in this.CanvasStorage[0]) {
      let fromChildrens = this.CanvasStorage[0][iParent].querySelectorAll(from)
      let toChildrens = this.CanvasStorage[0][iParent].querySelectorAll(to)
      let _option = {...this.options, ...option}
      for (let fi = 0; fi < fromChildrens.length; fi++) {
        for (let ti = 0; ti < toChildrens.length; ti++) {
          let _arrow = new ArrowDraw(this.CanvasStorage[1][iParent], fromChildrens[fi], toChildrens[ti], _option)
          this.arrowList.push(_arrow)
          // drawArrow(this.CanvasStorage[1][iParent], fromChildrens[fi], toChildrens[ti], this.options, customOptions)
        }
        if (this.options.putToContainer === true) {
          this.CanvasStorage[2].push([from, to, option])
        }
      }
    }
    return this
  }

  arrows (arrowsArr) {
    for (let i = 0; i < arrowsArr.length; i++) {
      this.arrow(arrowsArr[i][0], arrowsArr[i][1], arrowsArr[i][2])
    }
    return this
  }
  clear () {
    for (let iCanvas in this.CanvasStorage[1]) {
      let canvas = this.CanvasStorage[1][iCanvas]
      let context = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
    return this
  }
  draw () {
    let putToContainer = this.options.putToContainer
    this.options.putToContainer = false
    for (let iArrow in this.CanvasStorage[2]) {
      this.arrow(this.CanvasStorage[2][iArrow][0], this.CanvasStorage[2][iArrow][1], this.CanvasStorage[2][iArrow][2])
    }
    this.options.putToContainer = putToContainer
    return this
  }
  redraw () {
    return this.clear().draw()
  }
  updateOptions (options) {
    if (options.base !== undefined) {
      this.options = {...this.options, ...options.base}
    }
    if (options.render !== undefined) {
      this.options.render = {...this.options.render, ...options.render}
    }
    if (options.arrow !== undefined) {
      this.options.arrow = {...this.options.arrow, ...options.arrow}
    }
    return this
  }
}
