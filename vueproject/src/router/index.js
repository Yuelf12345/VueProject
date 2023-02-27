//引入Vue|Vue-router
import Vue from 'vue'
import Router from 'vue-router'

//使用路由插件
Vue.use(Router)

export const constantRoutes = [
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    {
        path: '*',
        component: () => import('@/views/notFount/NotFound.vue'),
        hidden: true
      },
  ]

  const createRouter = () => new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    //因为注册的路由是‘死的’，‘活的’路由如果根据不同用户（角色）可以展示不同菜单
    routes: constantRoutes
  })
  
  const router = createRouter()
  
  export default router