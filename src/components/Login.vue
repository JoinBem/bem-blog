<template>
  <div id="login">
    <div class="login-wrap">
        <div class="login-title">博客管理后台</div>
        <div class="login-panel">
            <input type="text" class="login-name" placeholder="username" value="" v-model="username">
            <input type="password" class="login-pwd" placeholder="password" value="" v-model="userpwd">
            <button type="button" class="login-submit" v-on:click="doThis">Login</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      userpwd: ''
    }
  },
  methods: {
    doThis() {
      var username = this.username;
      var userpwd = this.userpwd;
      this.$http.post('/api/login', {
        username: username,
        userpwd: userpwd
      },{}).then(
      res => {
          if(Object.is(res.body, "error")){
            alert("登陆失败！")
          }else{
            this.$router.push({ name: 'Admin'})
          }
      }
      )
    }
}
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.login-wrap {
    width: 100vw;
    height: 100vh;
    background-color: #324157;
}
.login-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
}
.login-panel {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
    text-align: center;
}
.login-name {
    margin-bottom: 1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    display: block;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.login-pwd {
    margin-bottom: 1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    display: block;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.login-submit {
    width: 300px;
    border-color: #4db3ff;
    color: #fff;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #bfcbd9;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 4px;
    background-color: #20a0ff;
}
.case-number {
    margin-top: 1rem;
    font-size: 14px;
    color: #5d5d5d;
}
</style>
