<template>
    <div id="admin">
    	<div v-for="item in user">
        <div>{{item.motto}}</div>
        <div>{{item.name}}</div>
      </div>
	</div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
      user: []
    }
  },
  mounted() {
  	this.$http.get('/api/admin').then(
        res => {
        	if(Object.is(res.body, "noSession")){
        		this.$router.push({ name: 'Login'})
        	}
          this.user = res.body
          console.log(this.user)
        }
    )
  }
}
</script>

<style scoped>

</style>
