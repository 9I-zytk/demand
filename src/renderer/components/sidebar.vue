<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="sidebar-nav" v-for = 'menu in menus' :key = 'menu.id' :class = '{ "sidebar-nav-fold": !menu.expand }'>
        <div class="sidebar-title">
          <a href="#" @click="menuClick(menu)">
            <span class="icon"><b class="icon-arrow-down" v-if ='!menu.root'></b></span>
            <span class="text-normal" v-html = 'menu.title'>title</span>
          </a>
        </div>
        <ul class="sidebar-trans">
          <li v-for = 'menuItem in menu.menus' :key = 'menuItem.id'>
            <router-link :to='menuItem.route'>
              <b class="sidebar-icon">
                <img :src="menuItem.icon" width="16" height="16" />
              </b>
              <span class="text-normal" v-html = 'menuItem.title'></span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="css">
@import '../assets/scss/_nav.scss';
</style>
<script type="text/ecmascript-6">
  import authorIcon from '@/assets/icon_author.png'
  export default {
    name: 'SideBar',
    methods: {
      menuClick (menu) {
        if (menu.root) {
          this.$router.push('/home')
          menu.expand = false
        } else {
          menu.expand = !menu.expand
        }
      }
    },
    data () {
      return {
        menus: [{
          id: 1000,
          title: '主页',
          icon: authorIcon,
          expand: true,
          root: true,
          menus: {}
        }, {
          id: 1001,
          title: 'canvas',
          icon: '',
          expand: true,
          root: false,
          menus: [{
            id: 100101,
            title: '文字',
            icon: authorIcon,
            route: {
              name: 'canvasText',
              params: { }
            }
          }, {
            id: 100102,
            title: '坐标轴',
            icon: authorIcon,
            route: {
              name: 'axis',
              params: { }
            }
          }, {
            id: 100103,
            title: '音频/视频',
            icon: authorIcon,
            route: {
              name: 'axis',
              params: { }
            }
          }]
        }, {
          id: 1002,
          title: '游戏',
          icon: authorIcon,
          expand: true,
          root: false,
          menus: [{
            id: 100201,
            title: '雷霆战机',
            icon: authorIcon,
            route: {
              name: 'planeWar',
              params: { }
            }
          }, {
            id: 100202,
            title: '坦克大战',
            icon: authorIcon,
            route: {
              name: 'planeWar',
              params: { }
            }
          }, {
            id: 100203,
            title: '大鱼吃小鱼',
            icon: authorIcon,
            route: {
              name: 'planeWar',
              params: { }
            }
          }]
        }, {
          id: 1003,
          title: '试验田',
          icon: authorIcon,
          expand: true,
          root: false,
          menus: [{
            id: 100301,
            title: 'D3',
            icon: authorIcon,
            route: {
              name: 'planeWar',
              params: { }
            }
          }, {
            id: 100302,
            title: 'canvas',
            icon: authorIcon,
            route: {
              name: 'planeWar',
              params: { }
            }
          }, {
            id: 100303,
            title: '3D',
            icon: authorIcon,
            route: {
              name: 'planeWar',
              params: { }
            }
          }]
        }]
      }
    }
  }
</script>