<template>
  <div id="login">
    <input type="text" class="login-name" placeholder="username" name="username" v-model="username">
    <input type="password" class="login-pwd" placeholder="password" name="userpwd" v-model="userpwd">
    <button type="button" class="login-submit" v-on:click="doThis">Login</button>
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

<style scoped></style>