import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/router/permission' // 路由权限控制
import permission from '@/directives' //指令权限
import api from '@/api'  //获取后台数据接口

import md5 from 'js-md5' // md5加密
Vue.prototype.$md5 = md5


Vue.config.productionTip = false
Vue.use(ElementUI,permission)

Vue.prototype.$API = api

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
