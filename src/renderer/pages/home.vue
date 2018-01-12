<template>
    <div class="home">
        <header-bar></header-bar>
        <side-bar></side-bar>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
<style lang="css">
 @import '../assets/scss/base.scss';
.container {
    width: auto;
    position: absolute;
    top: 50px;
    left: 180px;
    bottom: 0;
    right: 0;
    overflow: auto;
    background: #FFF;
    z-index: 100;
}
</style>
<script type="text/ecmascript-6">
import SideBar from '@/components/sidebar'
import HeaderBar from '@/components/header'
export default {
  name: 'home',
  mounted: function () {
    this.init()
  },
  methods: {
    init () {

    }
  },
  components: {
    'side-bar': SideBar,
    'header-bar': HeaderBar
  },
  data () {
    return {
      msg: 'hello vue'
    }
  }
}
</script>