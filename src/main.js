// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//import router from './router'

import Index from '@/components/Index'
import ArticleDetails from '@/components/ArticleDetails'

import Login from '@/components/Login'
import Admin from '@/components/Admin'
import AdminArticleList from '@/components/AdminArticleList'
import AdminPersonalCenter from '@/components/AdminPersonalCenter'
import AdminArticleEdit from '@/components/AdminArticleEdit'
import AdminArticlePreview from '@/components/AdminArticlePreview'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'

// 此处需要use后，this.$http.get或者this.$http.post才可以
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)

Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
  	routes: [
    	{path: '/', name: 'Index', component: Index},
    	{path: '/articleDetails/:id', name: 'ArticleDetails', component: ArticleDetails},
    	{path: '/admin', name: 'Admin', component: Admin,
          children: [
                {path: 'articleList', component: AdminArticleList,
                  children: [
                    {path: 'articleEdit', component: AdminArticleEdit},
                    {path: 'articlePreview:id', component: AdminArticlePreview}
                  ]
              },
                {path: 'personalCenter', component: AdminPersonalCenter},
          ]
      },
    	{path: '/login', name: 'Login', component: Login}
  	]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})


