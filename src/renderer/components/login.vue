<template>
  <div class="admin_login">
    <dl>
      <dt>
        <strong>站点后台管理系统</strong>
        <em>Management System</em>
      </dt>
      <dd class="user_icon">
        <input type="text" placeholder="账号" v-model:lazy="name" class="login_txtbx"/>
      </dd>
      <dd class="pwd_icon">
        <input type="password" placeholder="密码" v-model:lazy="passWord" class="login_txtbx"/>
      </dd>
      <dd class="val_icon">
        <div class="checkcode">
          <input type="text" v-model:lazy="vCode" placeholder="验证码" maxlength="4" class="login_txtbx">
          <canvas class="J_codeimg" id="myCanvas" @click="createCode()">对不起，您的浏览器不支持canvas，请下载最新版浏览器!</canvas>
        </div>
        <input type="button" value="验证码核验" class="ver_btn" @click="validate">
      </dd>
      <dd>
        <input type="button" value="立即登录" class="submit_btn" @click="login"/>
      </dd>
      <dd>
        <p>Copyright 武汉镝次元数据科技有限公司 © 2016 </p>
        <p>鄂ICP备15019128号-3</p>
      </dd>
    </dl>
  </div>
</template>
<style lang="css">
  .admin_login{
    width:300px;
    height:auto;
    overflow:hidden;
    padding:40px;
    box-shadow:0 -15px 30px #0d957a;
    border-radius:5px;
    position: absolute;
    left: calc(50% - 150px);
    top : calc(50% - 200px);
    z-index: 100;
  }
  .admin_login dt{font-size:20px;font-weight:bold;text-align:center;color:#f4f4f4;text-shadow:0 0 1px #0e947a;margin-bottom:15px;}
  .admin_login dt strong{display:block;}
  .admin_login dt em{display:block;font-size:12px;margin-top:8px;}
  .admin_login dd{margin:5px 0;height:42px;overflow:hidden;position:relative;}
  .admin_login dd .login_txtbx{font-size:14px;height:26px;line-height:26px;padding:8px 5%;width:90%;text-indent:2em;border:none;background:#5cbdaa;color:white;}
  .admin_login dd .login_txtbx::-webkit-input-placeholder {color:#f4f4f4;line-height:inherit;}
  .admin_login dd .login_txtbx:-moz-placeholder {color:#f4f4f4;line-height:inherit;}
  .admin_login dd .login_txtbx::-moz-placeholder {color:#f4f4f4;line-height:inherit;}
  .admin_login dd .login_txtbx:focus{background:#55b7a4;}
  .admin_login dd:before{font-family:'adminthemesregular';position:absolute;top:0;left:10px;height:42px;line-height:42px;font-size:20px;color:#0c9076;}
  .admin_login dd.user_icon:before{content:"u";}
  .admin_login dd.pwd_icon:before{content:"p";}
  .admin_login dd.val_icon:before{content:"n";}
  .admin_login dd .ver_btn{text-align:right;border:none;color:#f4f4f4;height:42px;line-height:42px;margin:0;z-index:1;position:relative;float:right;background:#48bca5;}
  .admin_login dd .checkcode{float:left;width:182px;height:42px;background:#fff}
  .admin_login dd .checkcode input{width:120px;height:36px;line-height:36px;padding:3px;color:white;outline:none;border:none;text-indent:2.8em;}
  .admin_login dd .checkcode canvas{
    width:85px;
    height:36px;
    padding:3px;
    z-index:0;
    background:#5cbdaa;
    position: absolute;
  }
  .admin_login dd .submit_btn{width:100%;height:42px;border:none;font-size:16px;background:#048f74;color:#f8f8f8;}
  .admin_login dd .submit_btn:hover{background:#0c9076;color:#f4f4f4;}
  .admin_login dd p{color:#f4f4f4;font-size:12px;text-align:center;margin:5px 0;}
</style>
<script type="text/ecmascript-6">
export default {
  name: 'login',
  mounted: function () {
    this.init()
  },
  methods: {
    init () {
      this.createCode()
    },
    createCode () {
      const codeLength = 4
      const selectChar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', ' E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      for (let i = 0; i < codeLength; i++) {
        let charIndex = Math.floor(Math.random() * 60)
        this.code += selectChar[charIndex]
      }
      if (this.code.length !== codeLength) {
        this.createCode()
      }
      this.showCheck(this.code)
    },
    showCheck (a) {
      const c = document.getElementById('myCanvas')
      const ctx = c.getContext('2d')
      ctx.clearRect(0, 0, 1000, 1000)
      ctx.font = '80px Microsoft Yahei'
      ctx.fillText(a, 0, 100)
      ctx.fillStyle = 'white'
    },
    validate () {
      if (this.vCode.toUpperCase() !== this.code.toUpperCase()) {
        return false
      }
      return true
    },
    login () {
      // const postData = {
      //   name: this.name,
      //   passWord: this.passWord
      // }
      // const url = this.url + 'login'
      const _this = this
      // this.$http.post(url, postData).then(function (response) {
      //   if (response.data.code === -1) {
      //
      //   } else {
      //     const token = response.data.token
      //     localStorage.setItem('token', token)
      //     _this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
      _this.$router.push('/home')
      //   }
      // }).catch(function (error) {
      //   _this.createCode()
      // })
    }
  },
  data () {
    return {
      url: 'http://localhost:6001/api/',
      msg: 'hello vue',
      code: '',
      name: '',
      passWord: '',
      vCode: ''
    }
  }
}
</script>
