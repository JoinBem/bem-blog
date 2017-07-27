<template>
	<div class="articel-edit-wrap">
        <div class="article-title">
            <input type="text" v-model="articleTitle">
        </div>
        <div class="article-toolbar">
            <div class="action-button">
                <el-button v-if="this.$route.query.id" type="danger" size="small" @click="delectArticles">删除</el-button>
                <el-button type="primary" size="small" @click="publishedArticles">发布文章</el-button>
            </div>
        </div>
        <textarea id="editor"></textarea>
	</div>
</template>

<script>
import SimpleMDE from 'simplemde'
import '../assets/simplemde.css'
import marked from 'marked';
import highlight from 'highlight.js'
import '../assets/atom-one-light.css'
export default {
	data () {
        return {
            articleTitle: '请输入文章标题',
            content: '',
            tags: [],
            list: []
        }
    },
    mounted: function(){
        var self = this
        var smde = new SimpleMDE({
            element: document.getElementById('editor'),
            autofocus: true,
            autosave: true,
            previewRender: function(plainText) {
                return marked(plainText,{
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight: function (code) {
                        return highlight.highlightAuto(code).value;
                    }
                });
            },
        });
        smde.codemirror.on("change", function(){
            var value = smde.value();
            self.content = value
        });


        if(this.$route.query.id){
            this.$http.post('/api/admin/articleDetails', {
                id: this.$route.query.id
            }).then(
                respone => {
                    this.articleTitle = respone.body[0].title,
                    smde.value(respone.body[0].content)
                },
                respone => console.log(respone)
            )
        } else {
            smde.value("快来开始写博客吧");
        }

    },
    methods: {
        // 删除
        delectArticles: function(){
            this.$http.post('/api/admin/del', {
                id : this.$route.query.id
            }).then(
                respone => {
                    this.$message('删除成功'),
                    this.$emit('saveArticleInformation'),
                    this.$router.push('/admin/articleList/articleEdit')
                },
                respone => {
                    this.$message.error('删除失败请重试')
                }
            )
        },
        // 发布文章
        publishedArticles: function(){
        	var self = this
        	if(this.$route.query.id){
    	        // 更新
    	        var obj = {
    	            id: this.$route.query.id,
                    title: self.articleTitle,
                    content: self.content,
                    state: 'publish',
                }
                this.$http.post('/api/admin/updateArticle',{
                    obj: obj
                }).then(
                    respone => {
                        Message.success('文章发布成功')
                        // 如果文章信息保存成功就给父组件派发一个事件通知它刷新文章列表
                        self.$emit('saveArticleInformation')
                    },
                    respone => {
                        Message.error('文章发布成功')
                    }
                )
    	    } else {
    	        // 新建发布
                var obj = {
                    title: self.articleTitle,
                    content: self.content,
                    state: 'publish',
                }
                this.$http.post('/api/admin/saveArticle', {
                    articleInformation: obj
                }).then(
                    respone => {
                        Message.success('文章发布成功')
                        // 如果文章信息保存成功就给父组件派发一个事件通知它刷新文章列表
                        self.$emit('saveArticleInformation')
                    },
                    respone => Message.error('文章发布失败')
                )
            }
        },
    },
    directives: {

    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-active {
    opacity: 0
}
.articel-edit-wrap {
    width: 100%;
    height: 100%;
}
.article-title {
    height: 45px;
    border-bottom: 1px solid #f1f1f1;
}
.article-title > input {
    border: none;
    outline-style: none;
    width: 97%;
    height: 43px;
    padding-left: 10px;
    font-size: 20px;
}
.article-toolbar {
    height: 60px;
    line-height: 60px;
}
.label {
    width: 60%;
    height: 60px;
    line-height: 60px;
    padding-left: 10px;
    float: left;
    display: table-cell;
    vertical-align: middle;
}
.label > img {
    vertical-align: middle;
    cursor: pointer;
}
.label > img:hover {
    border-bottom: 2px solid #20a0ff;
}
.tag-list-wrap {
    border: 1px solid #e0e6ed;
    padding: 5px;
    max-height: 150px;
    overflow: auto;
}
.tag-list-wrap > li {
    margin: 2px;
    padding: 3px;
    cursor: pointer;
    height: 30px;
    line-height: 36px;
}
.tag-list-wrap > li:hover {
    background-color: #e0e6ed;
}
.action-button {
    min-width: 120px;
    float: right;
    padding-right: 20px;
}
.CodeMirror {
    border-bottom: none!important;
    border-left: none!important;
    border-right: none!important;
    border-top: 1px solid #f1f1f1!important;
}
.editor-toolbar {
    border-top-left-radius: 0!important;
    border-top-right-radius: 0!important;
    border-left: none!important;
    border-right: none!important;
    border-top: 1px solid #f1f1f1!important;
}
.editor-statusbar {
    display: none;
}
</style>
