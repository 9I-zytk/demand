<template>
  <div class="axis">
    <div class="tool-bar">
    </div>
    <canvas id='canvasText' width="800" height="600">
      您的浏览器不支持canvas，请升级或者更换到chrome,firefox
    </canvas>
  </div>
</template>
<style lang="css">

</style>
<script type="text/ecmascript-6">
  import { Array1D, ENV, Scalar } from 'deeplearn'

  export default {
    name: 'axis',
    mounted: function () {
      this.init()
    },
    methods: {
      init () {
        const math = ENV.math
        const a = Array1D.new([1, 2, 3])
        const b = Scalar.new(2)

        const result = math.add(a, b)
        // Option 1: With async/await.
        // Caveat: in non-Chrome browsers you need to put this in an async function.
        // console.log(await result.data());
        // Option 2: With a Promise.
        result.data().then(data => console.log(data))

        // Option 3: Synchronous download of data.
        // This is simpler, but blocks the UI until the GPU is done.
        console.log(result.dataSync())
      }
    },
    data () {
      return {
        msg: 'hello vue'
      }
    }
  }
</script>