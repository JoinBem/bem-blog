<template>
	<div id="index">
	<div id="page">
		<div id="fh5co-aside" style="background-image: url(static/images/image_1.jpg)">
			<div class="overlay"></div>
			<nav role="navigation">
				<ul>
					<li><a href="/"><i class="icon-home"></i></a></li>
				</ul>
			</nav>
			<div class="featured">
				<span>Baby</span>
				<h2>we are Bem </a></h2>
			</div>
		</div>
		<div id="fh5co-main-content">
			<div class="fh5co-post"> 
				<div class="fh5co-entry padding" v-for="item in articleList" :key="item._id" @click="articlesDetailsFn(item.id)">
					<img src="/static/images/project-2.jpg" alt="???">
					<div>
						<span class="fh5co-post-date">{{new Date(item.date).format('yyyy-MM-dd hh:mm:ss')}}</span>
						<h2><a href="single.html">{{item.title}}</a></h2>
						<p>{{item.content}}</p>
					</div>
				</div>
				<footer>
					<div>
					Copyright © 2017 bem-blog.TOP
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

        Date.prototype.format = function(format) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o){
            if (new RegExp("(" + k + ")").test(format)){
                format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
  },
  methods: {
    articlesDetailsFn: function(id){
        this.$router.push({ name: 'ArticleDetails', params: { id: id }})
    }
}
}
</script>

<style scoped>
@import '/static/css/animate.css';
@import '/static/css/bootstrap.css';
@import '/static/css/icomoon.css';
@import '/static/css/style.css';
</style>
