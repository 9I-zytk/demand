<template>
    <div class="canvas-text">
        <div>
            <input type="checkbox" id="fill" value="fill" v-model="fill" @change="draw">
            <label for="fill">填充</label>
            <input type="checkbox" id="stroke" value="stroke" v-model="stroke" @change="draw">
            <label for="stroke">描边</label>
            <input type="checkbox" id="shadow" value="shadow" v-model="shadow" @change="draw">
            <label for="shadow">阴影</label>
            <input type="checkbox" id="gradient" value="gradient" v-model="gradient" @change="drawComplex">
            <label for="gradient">线性</label>
            <input type="text" name="text" v-model:lazy="text" @change="draw">
            <input type="text" name="text" v-model:lazy="imageSrc" @change="imageChange">
        </div>
        <canvas id= 'canvasText' width="800" height="600">
            您的浏览器不支持canvas，请升级或者更换到chrome,firefox
        </canvas>
    </div>
</template>
<style lang="css">
    .canvas-text{
        padding: 15px;
    }
</style>
<script type="text/ecmascript-6">
  export default {
    name: 'canvasText',
    mounted: function () {
      this.init()
    },
    methods: {
      init () {
        this.canvas = document.getElementById('canvasText')
        this.context = this.canvas.getContext('2d')
        this.text = 'HTML5'
        this.context.font = '128px Palatino'
        this.context.lineWidth = 1
        this.context.fillStyle = 'red'
        this.context.strokeStyle = 'blue'
        const _this = this
        _this.onLoad = (function (self) {
          return function () {
            self.drawPattern()
          }
        })(_this)
        this.imageSrc = 'http://t1.niutuku.com/960/38/38-82945.jpg'
        this.draw()
      },
      draw () {
        const _context = this.context
        _context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
        this.drawBackground()
        this.drawText()
      },
      drawComplex () {
        const _context = this.context
        _context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
        this.drawBackground()
        this.drawGradient()
      },
      drawBackground () {
        const stepY = 12
        const topMargin = stepY * 4
        const leftMargin = stepY * 3
        const _context = this.context
        let height = _context.canvas.height
        _context.strokeStyle = 'lightgray'
        _context.lineWidth = 0.5
        while (height > topMargin) {
          _context.beginPath()
          _context.moveTo(leftMargin, height)
          _context.lineTo(_context.canvas.width, height)
          _context.stroke()
          height -= stepY
        }
        // 横线
        _context.strokeStyle = 'rbga(100, 0 , 0, 0.3)'
        _context.lineWidth = 1
        // 左边
        _context.beginPath()
        _context.moveTo(leftMargin, height + stepY)
        _context.lineTo(leftMargin, _context.canvas.height)
        _context.stroke()
        // 右边
        _context.beginPath()
        _context.moveTo(_context.canvas.width, height + stepY)
        _context.lineTo(_context.canvas.width, _context.canvas.height)
        _context.stroke()
      },
      drawGradient () {
        const _context = this.context
        _context.shadowColor = 'rgba(0, 0, 0, 0.8)'
        _context.shadowOffsetX = 5
        _context.shadowOffsetY = 5
        _context.shadowBlur = 10
        const gradient = _context.createLinearGradient(0, 0, _context.canvas.width, _context.canvas.height)
        gradient.addColorStop(0, 'blue')
        gradient.addColorStop(0.25, 'blue')
        gradient.addColorStop(0.5, 'white')
        gradient.addColorStop(0.75, 'red')
        gradient.addColorStop(1, 'yellow')
        _context.fillStyle = gradient
        _context.fillText(this.text, 65, 200)
        _context.strokeText(this.text, 65, 200)
        console.log(_context.measureText(this.text))
      },
      drawPattern () {
        const _context = this.context
        this.pattern = this.context.createPattern(this.image, 'repeat')
        console.log(this.pattern)
        _context.fillStyle = this.pattern
        _context.fillText(this.text, 65, 450)
        _context.strokeText(this.text, 65, 450)
      },
      imageChange () {
        console.log(this.imageSrc)
        if (!this.imageSrc) return false
        const _this = this
        const image = new Image()
        image.onload = _this.onLoad
        image.src = _this.imageSrc
        _this.image = image
      },
      drawText () {
        const X = 65
        const Y = this.context.canvas.height / 2 + 35
        const _context = this.context
        if (this.shadow) {
          _context.shadowColor = 'rgba(0, 0, 0, 0.8)'
          _context.shadowOffsetX = 5
          _context.shadowOffsetY = 5
          _context.shadowBlur = 10
        } else {
          _context.shadowColor = undefined
          _context.shadowOffsetX = 0
          _context.shadowOffsetY = 0
          _context.shadowBlur = 0
        }
        if (this.fill) this.context.fillText(this.text, X, Y)
        if (this.stroke) this.context.strokeText(this.text, X, Y)
      }
    },
    data () {
      return {
        text: '',
        fill: true,
        pattern: true,
        gradient: true,
        stroke: false,
        shadow: true,
        imageSrc: ''
      }
    }
  }
</script>