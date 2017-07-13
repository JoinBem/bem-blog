<template>
	<div id="index">
	<div id="page">
		<div id="fh5co-aside" style="background-image: url(static/images/image_1.jpg)">
			<div class="overlay"></div>
			<nav role="navigation">
				<ul>
					<li><a href="index.html"><i class="icon-home"></i></a></li>
				</ul>
			</nav>
			<div class="featured">
				<span>Bio</span>
				<h2>I'm John Doe </a></h2>
			</div>
		</div>
		<div id="fh5co-main-content">
			<div class="fh5co-post"> 
				<div class="fh5co-entry padding" v-for="item in articleList" :key="item._id" @click="articlesDetailsFn(item.id)">
					<img src="images/project-1.jpg" alt="Free HTML5 Bootstrap Template by FreeHTML5.co">
					<div>
						<span class="fh5co-post-date">October 12, 2016</span>
						<h2><a href="single.html">How to be an effective web developer{{item.title}}</a></h2>
						<p>How two simple exercises changed my life</p>
					</div>
				</div>
				<footer>
					<div>
					&copy; 2016 Free HTML5. All Rights Reserved. More Templates <a href="http://www.cssmoban.com/" target="_blank" title="模板之家">模板之家</a> - Collect from <a href="http://www.cssmoban.com/" title="网页模板" target="_blank">网页模板</a>
					</div>
				</footer>
			</div>
		</div>
	</div>
	<div class="gototop js-top">
		<a href="#" class="js-gotop"><i class="icon-arrow-up"></i></a>
	</div>
	</div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      articleList: []
    }
  },
  mounted() {
  	this.$http.get('/api/articleList').then(
        res => {
            this.articleList = res.body
        },
        res => {
            console.log(res)
        }
    )
  },
  methods: {
    articlesDetailsFn: function(id){
        this.$router.push({ name: 'ArticleDetails', params: { id: id }})
    }
}
}
</script>

<style scoped>

</style>
