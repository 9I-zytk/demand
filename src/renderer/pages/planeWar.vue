<template>
    <div>
        <div class="planeWar">
            <canvas id='planeWar'></canvas>
        </div>
    </div>
</template>
<style lang="css">
    .planeWar {
        z-index: 1000;
    }
</style>
<script type="text/ecmascript-6">
import PlaneWar from '@/plugins/planeWar'
export default {
  name: 'PlaneWar',
  mounted: function () {
    this.init()
  },
  methods: {
    init () {
      this.plane = new PlaneWar(window.innerWidth - 180, window.innerHeight - 50)
    }
  },
  data () {
    return {
      msg: 'hello vue'
    }
  }
}
</script>