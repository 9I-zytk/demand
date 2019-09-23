<template>
  <div class="header">
    <div class="top-console">
      <div class="top-head">
        <a href="/" class="top-logo">
          <span><img src="../assets/logo.png" width="20" height="20"/></span>
        </a>
        <a href="index.html" class="top-home-link top-btn text-center"><span>管理控制台</span></a>
      </div>
    </div>
    <div class="top-info">
      <ul class="fr">
        <li class="dropdown top-notice top-btn">
          <a href="#" class="dropdown-toggle">
            <span class="icon-notice"></span>
            <span class="top-num have">0</span>
          </a>
        </li>
        <li class="top-info-item" @click="helpClick" v-if="false">
          <div class="dropdown" :class ='{"open" : isOpen}'>
            <a href="#" class="top-btn">
              <span class="fl text-normal">帮助与文档</span>
              <span class="icon-arrow-down"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a href="#">模板开发手册</a></li>
              <li><a href="#">某某数据字典</a></li>
            </ul>
          </div>
        </li>
        <li class="top-info-item" @click="userClick">
          <div class="dropdown" :class ='{"open" : isUserOpen}'>
            <a href="#" class="top-btn">
              <span class="fl text-normal" v-html = 'name'></span>
              <span class="icon-arrow-down"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a href="#" @click="signOut">退出</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
@import '../assets/scss/_header.scss';
</style>
<script type="text/ecmascript-6">
  export default {
    name: 'header',
    methods: {
      helpClick (menu) {
        this.isOpen = !this.isOpen
        this.isUserOpen = false
      },
      userClick () {
        this.isOpen = false
        this.isUserOpen = !this.isUserOpen
      },
      signOut () {
        const postData = {
          name: this.name
        }
        const url = this.url + 'signOut'
        const _this = this

        this.$http.post(url, postData).then(function (response) {
          if (response.data.code === -1) {
            console.log(response, response.data.message)
          } else {
            const token = ''
            localStorage.setItem('token', token)
            _this.name = ''
            _this.$router.push('/home')
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    data () {
      return {
        name: 'admin',
        url: 'http://localhost:6001/api/',
        isOpen: false,
        isUserOpen: false
      }
    }
  }
</script>
