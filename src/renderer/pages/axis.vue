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
.editor {
  border: 1px solid #e7f6ff;;
}
</style>
<script type="text/ecmascript-6">
  // import { Array1D, ENV, Scalar } from 'deeplearn'
  import Editor from '@/plugins/editor'

  export default {
    name: 'axis',
    mounted: function () {
      this.init()
    },
    methods: {
      init () {
        const editor = Editor.getEditor('canvasText', {})
        console.log(editor)
      }
    },
    data () {
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
