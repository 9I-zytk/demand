/**
 * Created by 9i
 * @Date 2017/11/24
 */
'use strict'
import tool from '../tools'

class Frame {
  constructor (width, height, resources) {
    // 画布大小
    this.width = width
    this.height = height
    // 需要加载资源数
    this.resources = resources || 0
    // 加载进度条
    this.progress_count = 0
    this.canvas = document.getElementById('planeWar')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.context = this.canvas.getContext('2d')
  }
  init () {
    const _this = this
    _this.context.save()
    // 循环绘制画布
    animate()
    function animate () {
      _this.drawProgress()
      if (_this.progress_count < _this.resources) {
        _this.progress_count++
        tool.requestAnimationFrame(animate)
      } else {
        _this.context.restore()
        _this.start()
      }
    }
  }
  // animate () {
  //   this.drawProgress()
  //   const _this = this
  //   _this.animateHandle = (function (self) {
  //     return function () {
  //       return self.animate()
  //     }
  //   })(_this)
  //   if (this.progress_count < this.resources) {
  //     this.progress_count++
  //     tool.requestAnimationFrame(_this.animateHandle)
  //   } else {
  //     this.context.restore()
  //     this.start()
  //   }
  // }
  // 进度条绘制
  drawProgress () {
    // 进度条位置以及大小
    const _progress = {
      x: this.width * 0.2,
      y: this.height * 0.45,
      width: this.width * 0.6,
      height: 30
    }
    const ctx = this.context
    ctx.shadowBlur = 20
    ctx.shadowColor = '#aaffaa'
    let progress = parseInt(_progress.width * this.progress_count / this.resources)
    // 绘制背景
    ctx.beginPath()
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, this.width, this.height)
    ctx.closePath()
    // 绘制进度条边框
    ctx.beginPath()
    // ctx.strokeStyle = '#aaffaa'
    ctx.fillStyle = '#ffffff'
    ctx.lineWidth = 3
    ctx.lineJoin = 'round'
    ctx.fillRect(_progress.x, _progress.y, _progress.width, _progress.height)
    ctx.closePath()
    // 进度条
    ctx.beginPath()
    ctx.lineJoin = 'round'
    const grd = ctx.createLinearGradient(_progress.x, 0, _progress.x + _progress.width, 0)
    grd.addColorStop(0, '#ffffff')
    grd.addColorStop(0.4, '#66ff58')
    grd.addColorStop(1, '#27ff14')
    ctx.fillStyle = grd
    ctx.fillRect(_progress.x, _progress.y, progress, _progress.height)
    ctx.closePath()
    // 绘制文字
    ctx.beginPath()
    const grdText = ctx.createLinearGradient(0, _progress.y + _progress.height * 2, 0, _progress.y + _progress.height * 3)
    grdText.addColorStop(0, '#ffffff')
    grdText.addColorStop(0.4, '#83ff8d')
    grdText.addColorStop(1, '#38ff22')
    ctx.fillStyle = grdText
    ctx.textAlign = 'center'
    ctx.font = '35px Arial'
    ctx.fillText(parseInt(this.progress_count * 100 / this.resources) + '%', this.width * 0.5, _progress.y + _progress.height * 3)
    ctx.closePath()
  }
  /**
   * 获取图片
   */
  getImg (src) {
    const _this = this
    const img = new Image()
    img.onload = function () {
      _this.progress_count++
    }
    img.onerror = function () {
      console.log('图片加载失败：' + src)
    }
    img.src = src
    return img
  }
}

export default Frame
