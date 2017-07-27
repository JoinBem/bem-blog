<template>
<div id="articleDetails" class="single">

	<div id="page" v-for="item in list">
		<div id="fh5co-aside" style="background-image: url(/static/images/500291435.jpg)" data-stellar-background-ratio="0.5">
			<div class="overlay"></div>
			<nav role="navigation">
				<ul>
					<li><a href="/"><i class="icon-home"></i></a></li>
				</ul>
			</nav>
			<div class="page-title">
				<img v-bind:src="qiniu_domain + form.head_name" alt="Free HTML5 by FreeHTMl5.co">
				<span style="color: #80FF00">{{form.name}}</span>
				<span style="color: #95E4CA">{{form.motto}}</span>
				<h2>{{item.title}}</h2>
			</div>
		</div>
		<div id="fh5co-main-content">
			<div class="fh5co-post"> 
				<div class="fh5co-entry padding">
					<div>
					<p v-compiledMarkdown>{{item.content}}</p>
					</div>
				</div>
				
				

			</div>
		</div>
	</div>
	<footer>
		<div>Copyright © 2017 bem-blog.TOP </div>
	</footer>

	<div class="gototop js-top">
		<a href="#" class="js-gotop"><i class="icon-arrow-up"></i></a>
	</div>
	</div>
</template>

<script>
import marked from 'marked';
import highlight from 'highlight.js'
export default {
  name: 'articleDetails',
  data () {
    return {
      qiniu_domain: 'http://otbqvvdu3.bkt.clouddn.com/',
      list: [],
      form: {
        name: '',
        motto: '',
        head_name: '',
      }
    }
  },
  mounted () {
    this.fetchData()
	marked.setOptions({
		renderer: new marked.Renderer(),
		gfm: true,
		tables: true,
		breaks: true,
		pedantic: false,
		sanitize: false,
		smartLists: true,
		smartypants: false,
		highlight: function (code) {
		    return highlight.highlightAuto(code).value;
		}
	});
},
methods: {
    fetchData (){
        let id = this.$route.params.id
        this.$http.get('/api/articleDetails/'+ id).then(
            res => {
                this.list = res.body
	            this.$http.post('/api/selectUser', {
	                user_id: this.list[0].user_id
	            }).then(
	                respone => {
	                    this.form = respone.body[0]
	                	//this.list.push(res.body)
	                },
	                respone => console.log(respone)
	            )
            },
            res => console.log('错误'+res)
        )
    },
},
directives: {
    compiledMarkdown: {
        bind: function(el){
            el.innerHTML = marked(el.innerText)
        }
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
