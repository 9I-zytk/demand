<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable no-unused-vars */
import 'particles.js'
import setting from './particles.json'

export default {
  name: 'demand',
  mounted: function () {
    this.initBackground()
  },
  methods: {
    initBackground () {
      const params = setting
      window.particlesJS('app', params)
    }
  },
  data () {
    return {
      msg: 'hello vue'
    }
  }
}
</script>

<style lang='css'>
  /* CSS */
  @import "assets/base.css";
  #app {
    background-color: #22d7bb;
    height: 100%;
    width: 100%;
  }
  html,body {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "Microsoft YaHe";
  }
  canvas.particles-js-canvas-el{
    position:fixed;
    z-index: 1;
  }
</style>
