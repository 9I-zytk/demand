/**
 * Created by 9i
 * @Date 2017/11/23
 */

'use strict'
import Frame from './components/frame'
import Button from './components/button'
import Queue from './components/drawQueue'
import BackCanvas from './components/backCanvas'
import * as resource from './resources'
import Tool from './tools'
import OurPlane from './components/OurPlane'
import Bullet from './components/bullet'
import EnemyPlane from './components/enemyPlane'

class planeWar extends Frame {
  // 构造器
  constructor (width, height) {
    super(width, height, 60)
    // 分数
    this._score = 0
    this.isPause = false
    // 画布大小
    this.width = width || window.innerWidth
    this.height = height || window.innerHeight
    // 开始时间
    this.beginTime = new Date().getTime()
    /* 敌方伤害系数
    * 0 -- 无敌状态
    * 1 -- 正常状态
    */
    this.hurtModulus = 1
    this.level = 0
    // 帧率
    this.fps = 1000 / 60
    // 加载资源
    this.resources = Object.keys(resource).length
    this.startBgImg = this.getImg(this.width > 1024 ? resource.startBgLgUrl : resource.startBgUrl)
    this.startButtonImg = this.getImg(resource.startButtonUrl)
    // 我方飞机参数
    this.planeImg = this.getImg(resource.planeImg)
    this.planeOpt = {
      img: this.planeImg,
      w: 96,
      h: 64,
      v: 180
    }
    this.planeOpt.x = (this.width - this.planeOpt.w) / 2
    this.planeOpt.y = this.height - this.planeOpt.h - 30
    this.plane = new OurPlane(this.planeImg, this.context, this.planeOpt.x, this.planeOpt.y, this.planeOpt.w, this.planeOpt.h)
    this.plane.range = [0 - this.planeOpt.w / 2, 0, this.width - this.planeOpt.w / 2, this.height - this.planeOpt.h]
    // 子弹图片
    this.btImg = this.getImg(resource.bullet)
    this.btImgBuff = this.getImg(resource.bulletBuff)
    // 子弹开始时间
    this.plane.beginTime = this.beginTime
    // 子弹发射间隔
    this.plane.interval = 600 - this.level * 50
    // 子弹伤害
    this.plane.hurt = 100
    // 子弹大小
    this.plane.bW = 15
    this.plane.bH = 30
    this.plane.bV = 300
    // HP 图片
    this.hpImg = this.getImg(resource.hpImg)
    this.hp = {
      x: 70,
      y: 20,
      w: 140,
      h: 24
    }
    // 背景图片
    this.bgImgAry = [this.getImg(resource.bgImg1),
      this.getImg(resource.bgImg2),
      this.getImg(resource.bgImg3),
      this.getImg(resource.bgImg4),
      this.getImg(resource.bgImg5)]
    // 数字图片
    this.numImg = [this.getImg(resource.numImg0),
      this.getImg(resource.numImg1),
      this.getImg(resource.numImg2),
      this.getImg(resource.numImg3),
      this.getImg(resource.numImg4),
      this.getImg(resource.numImg5),
      this.getImg(resource.numImg6),
      this.getImg(resource.numImg7),
      this.getImg(resource.numImg8),
      this.getImg(resource.numImg9)
    ]
    // 敌机
    this.enemyImg = [
      this.getImg(resource.enemy1),
      this.getImg(resource.enemy2),
      this.getImg(resource.enemy3),
      this.getImg(resource.enemy4),
      this.getImg(resource.enemy5),
      this.getImg(resource.boss1)
    ]
    this.enemyOpt = {
      w: [76, 75, 106, 140, 177, 259],
      h: [55, 57, 76, 99, 135, 196],
      hurt: [30, 30, 50, 100, 100, 200],
      score: [10, 10, 50, 100, 200, 500],
      hp: [100, 100, 200, 200, 300, 500],
      v: [120, 120, 100, 100, 80, 60],
      interval: [2000, 2000, 5000, 10000, 15000, 60000],
      createTime: [this.beginTime, this.beginTime, this.beginTime, this.beginTime, this.beginTime, this.beginTime]
    }
    // 初始化背景
    this.bgImg = this.bgImgAry[this.level]
    this.bg1 = new BackCanvas(this.bgImg, this.context, 0, 0, this.width, this.height, 42)
    this.bg2 = new BackCanvas(this.bgImg, this.context, 0, 0 - this.height, this.width, this.height, 42)
    this.bg1.fps = this.fps
    this.bg2.fps = this.fps
    this.init()
  }
  /* 游戏初始化 */
  init () {
    this.btQueue = new Queue()
    this.enemyPlaneQueue = new Queue()
    super.init()
  }
  getCanvas (x, y) {
    let boxRect = this.canvas.getBoundingClientRect()
    return {
      x: x - boxRect.left * (this.canvas.width / boxRect.width),
      y: y - boxRect.top * (this.canvas.height / boxRect.height)
    }
  }
  /* 游戏开始界面 */
  start () {
    const _this = this
    this.startBg = new BackCanvas(this.startBgImg, this.context, 0, 0, this.width, this.height)
    this.startBg.draw()
    this.startQueue = new Queue()
    this.startButton = new Button(this.startButtonImg, this.context, (this.width - 176) / 2, this.height - 200, 176, 52)
    this.startQueue.push(this.startButton)
    this.startButton.addClick(this.startGame)
    this.startButton.draw()
    window.onclick = function (e) {
      let loc = _this.getCanvas(e.clientX, e.clientY)
      const clickObj = _this.startQueue.getClickItem(loc.x, loc.y)
      if (clickObj !== undefined) {
        clickObj.clickHandle(_this)
      }
    }
  }
  startGame (self) {
    self.gameStart()
  }
  gameStart () {
    const _this = this
    // 监听键盘事件
    window.addEventListener('keydown', function (event) {
      const e = event || window.event
      _this.plane.keyDown(e.keyCode)
    })
    window.addEventListener('keyup', function (event) {
      const e = event || window.event
      if (e.keyCode === 32) { // 空格键-用于游戏暂停
        if (_this.isPause) {
          _this.isPause = false
          Tool.fps_lastTime = 0
          animate(new Date().getTime(), _this.fps)
        } else {
          _this.isPause = true
        }
      } else {
        _this.plane.keyUp(e.keyCode)
      }
    })
    // 鼠标事件监听
    _this.canvas.addEventListener('mousemove', function (event) {
      const e = event || window.event
      _this.plane.mouseMove(e.offsetX, e.offsetY)
    })
    // 手指移动touch move事件
    _this.canvas.addEventListener('touchmove', function (event) {
      const e = event || window.event
      const ct = e.changedTouches[0]
      _this.plane.mouseMove(ct.pageX, ct.pageY)
    })
    animate(new Date().getTime(), this.fps)
    function animate (thisTime, fps) {
      if (!_this.isPause) {
        Tool.requestAnimationFrame(animate, _this.isPause)
      }
      _this.gaming(thisTime, fps)
    }
  }
  gaming (thisTime, fps) {
    const _this = this
    if (this.plane._hitPoint === 0) this.gameOver()
    this.bg1.draw(fps)
    this.bg2.draw(fps)
    // 生成子弹
    if (thisTime - this.plane.beginTime > this.plane.interval) {
      // this.createBullet(-this.plane.bV, this.plane.bV)
      this.createBullet(0, this.plane.bV)
      // this.createBullet(this.plane.bV, this.plane.bV)
      this.plane.beginTime = thisTime
    }
    // 生成敌机
    for (let i = 0; i < 5; i++) {
      if (thisTime - this.enemyOpt.createTime[i] > this.enemyOpt.interval[i] - this.level * 100) {
        this.createEnemyPlane(i)
        this.enemyOpt.createTime[i] = thisTime
      }
    }
    if (this._score > this.level * (this.level - 1) * 1000 + 1000) this.level++
    // 绘制子弹
    this.btQueue.forEach(function (item) {
      item.draw(fps)
      // 碰撞检测
      if (item.isLife) {
        _this.enemyPlaneQueue.forEach(function (plane) {
          // 命中敌机
          if (plane.collisionCheck(item) && plane._hitPoint > 0 && item.isLife) {
            plane._hitPoint -= item.hurt
            item.isLife = false
          }
        })
      } else {
        _this.btQueue.remove(item)
      }
    })
    // 绘制敌机
    this.enemyPlaneQueue.forEach(function (item) {
      item.draw(fps)
      if (item._hitPoint === 0) {
        _this._score += item.score
        _this.enemyPlaneQueue.remove(item)
      } else {
        // 是否玩家碰撞
        if (item.collisionCheck(_this.plane) && _this.plane._hitPoint > 0) {
          _this.plane._hitPoint -= item.hurt * _this.hurtModulus > _this.plane._hitPoint ? _this.plane._hitPoint : item.hurt * _this.hurtModulus
          item._hitPoint = 0
        }
      }
    })
    this.drawScore()
    this.drawHitPoint()
    this.plane.draw(fps)
  }
  _drawContain () {

  }
  /* 绘制分数 */
  drawScore () {
    const _this = this
    let scoreStr = '' + this._score
    let x = _this.width - 52 - scoreStr.length * 32
    const y = 15
    scoreStr = scoreStr.split('')
    scoreStr.forEach(function (codeStr) {
      const codeInt = parseInt(codeStr)
      _this.context.drawImage(_this.numImg[codeInt], x += 32, y, 28, 38)
    })
  }
  /* 绘制血条 */
  drawHitPoint () {
    // 绘制血条
    this.context.beginPath()
    this.context.fillStyle = 'red'
    this.context.moveTo(this.hp.x, this.hp.y)
    const point = this.plane._hitPoint < this.plane._hitPointMax ? 0 : this.hp.h
    this.context.lineTo(this.hp.x + this.hp.w * this.plane._hitPoint / this.plane._hitPointMax + point, this.hp.y)
    this.context.lineTo(this.hp.x + this.hp.w * this.plane._hitPoint / this.plane._hitPointMax, this.hp.y + this.hp.h)
    this.context.lineTo(this.hp.x, this.hp.y + this.hp.h)
    this.context.fill()
    // 绘制血条边框
    this.context.beginPath()
    this.context.strokeStyle = '#bb3e00'
    this.context.lineWidth = 3
    this.context.moveTo(this.hp.x, this.hp.y)
    this.context.lineTo(this.hp.x + this.hp.w + this.hp.h, this.hp.y)
    this.context.lineTo(this.hp.x + this.hp.w, this.hp.y + this.hp.h)
    this.context.lineTo(this.hp.x, this.hp.y + this.hp.h)
    this.context.lineTo(this.hp.x, this.hp.y)
    this.context.stroke()
    // 绘制血条旁边的图片hp
    this.context.drawImage(this.hpImg, 10, 14, 57, 34)
  }
  /*  */
  /* 游戏结束 */
  gameOver () {
    this.isPause = true
  }
  /* 发射子弹 */
  createBullet (vX, vY, buff) {
    if (this.plane._hitPoint === 0) return false
    const img = buff ? this.btImgBuff : this.btImg
    const w = buff ? this.plane.bW * 2 : this.plane.bW
    const h = buff ? this.plane.bH * 2 : this.plane.bH
    const hurt = buff ? this.plane.hurt * 2 : this.plane.hurt
    const bt = new Bullet(img, hurt, this.context)
    bt.x = this.plane.x + (this.plane.w - w) / 2
    bt.y = this.plane.y - h
    bt.width = w
    bt.height = h
    bt.speedX = vX
    bt.speedY = vY
    this.btQueue.push(bt)
  }
  /* 产生敌机 */
  createEnemyPlane (type) {
    // Game Over 就不用绘制
    if (this.plane._hitPoint === 0) return false
    const img = this.enemyImg[type]
    const x = Math.round(Math.random() * this.width)
    const y = 0 - this.enemyOpt.h[type]
    const w = this.enemyOpt.w[type]
    const h = this.enemyOpt.h[type]
    const enemyPlane = new EnemyPlane(img, this.context, x, y, w, h)
    enemyPlane.speed = this.enemyOpt.v[type]
    enemyPlane._hitPoint = this.enemyOpt.hp[type]
    enemyPlane._hitPointMax = this.enemyOpt.hp[type]
    enemyPlane.hurt = this.enemyOpt.hurt[type]
    enemyPlane.score = this.enemyOpt.score[type]
    this.enemyPlaneQueue.push(enemyPlane)
  }
}
export default planeWar
