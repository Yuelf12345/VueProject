import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/router/permission' // 路由权限控制
import api from '@/api'  //获取后台数据接口
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$API = api

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
