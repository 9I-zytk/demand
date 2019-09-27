/**
 * Created by 9I
 * @Date 2019/9/24
 * @description
 */
import { getOffset, getCenterCoord, getAngleCoord, getEllipseCoord, getSideCoord, DegToRad } from './util'
export default class ArrowDraw {
  constructor (canvas, fromDiv, toDiv, option) {
    this.connectionType = option.connectionType || 'rectangleAuto'
    this.type = option.type || 'arrow'
    this.size = option.size || 9
    this.render = {
      lineWidth: 2,
      strokeStyle: '#a8b7b5'
    }
    this.option = option
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.fromDiv = fromDiv
    this.toDiv = toDiv
    this.init()
  }
  init () {
    this.context = Object.assign(this.context, this.render)
    this.drawArrow(this.canvas, this.fromDiv, this.toDiv)
  }
  canvasDraw (p1, p2) { // fromx, fromy, tox, toy
    let headlen = this.size0
    let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x)
    let ctx = this.context
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)

    switch (this.type) {
      case 'arrow':
        ctx.moveTo(p2.x - headlen * Math.cos(angle - Math.PI / 6), p2.y - headlen * Math.sin(angle - Math.PI / 6))
        ctx.lineTo(p2.x, p2.y)
        ctx.lineTo(p2.x - headlen * Math.cos(angle + Math.PI / 6), p2.y - headlen * Math.sin(angle + Math.PI / 6))
        break
      case 'line':
        // line already exist
        break
      case 'double-headed':
        // start
        ctx.moveTo(p1.x + headlen * Math.cos(angle - Math.PI / 6), p1.y + headlen * Math.sin(angle - Math.PI / 6))
        ctx.lineTo(p1.x, p1.y)
        ctx.lineTo(p1.x + headlen * Math.cos(angle + Math.PI / 6), p1.y + headlen * Math.sin(angle + Math.PI / 6))
        // end
        ctx.moveTo(p2.x - headlen * Math.cos(angle - Math.PI / 6), p2.y - headlen * Math.sin(angle - Math.PI / 6))
        ctx.lineTo(p2.x, p2.y)
        ctx.lineTo(p2.x - headlen * Math.cos(angle + Math.PI / 6), p2.y - headlen * Math.sin(angle + Math.PI / 6))

        break
      default:
        break
    }

    ctx.stroke()
  }

  drawArrow (canvas, div1, div2) { // color, lineWidth, shadowColor, shadowBlur , div1side, div2side
    let dot1 = getOffset(canvas, div1)
    let dot2 = getOffset(canvas, div2)
    let c1, c2

    switch (this.connectionType) {
      case 'rectangleAuto':
        c1 = getCenterCoord(dot1)
        c2 = getCenterCoord(dot2)
        dot1 = getAngleCoord(dot1, c1, Math.atan2(c1.y - c2.y, c1.x - c2.x) + Math.PI)
        dot2 = getAngleCoord(dot2, c2, Math.atan2(c2.y - c1.y, c2.x - c1.x) + Math.PI)
        break
      case 'center':
        dot1 = getCenterCoord(dot1)
        dot2 = getCenterCoord(dot2)
        break
      case 'ellipseAuto':
        c1 = getCenterCoord(dot1)
        c2 = getCenterCoord(dot2)
        dot1 = getEllipseCoord(dot1, c1, Math.atan2(c2.y - c1.y, c2.x - c1.x))
        dot2 = getEllipseCoord(dot2, c2, Math.atan2(c1.y - c2.y, c1.x - c2.x))
        break
      case 'side':
        dot1 = getSideCoord(dot1, this.option.sideFrom)
        dot2 = getSideCoord(dot2, this.option.sideTo)
        break
      case 'rectangleAngle':
        dot1 = getAngleCoord(dot1, getCenterCoord(dot1), DegToRad(this.option.angleFrom))
        dot2 = getAngleCoord(dot2, getCenterCoord(dot2), DegToRad(this.option.angleTo))
        break
      case 'ellipseAngle':
        dot1 = getEllipseCoord(dot1, getCenterCoord(dot1), DegToRad(this.option.angleFrom))
        dot2 = getEllipseCoord(dot2, getCenterCoord(dot2), DegToRad(this.option.angleTo))
        break
      default:
        break
    }

    this.canvasDraw(dot1, dot2) // - put type of arrow here
  }
}
