import router from "@/router";
import store from "@/store";
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import asyncRoutes from "@/router/modules/asyncRoutes";
import anyRouters from "@/router/modules/anyRouters";
import filterAsyncRoutes from '@/utils/filterAsyncRouters'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']  //  无重定向白名单


// 全局前置守卫鉴权
router.beforeEach(async(to,from,next)=>{
document.title = to.meta.title
    
// var _hmt = _hmt || [];
// (function() {
//   var hm = document.createElement("script");
//   hm.src = "https://hm.baidu.com/hm.js?d72c73280e2e257ef708eec1519ef82c";
//   var s = document.getElementsByTagName("script")[0]; 
//   s.parentNode.insertBefore(hm, s);
// })();
    
    if(from.path !== '/dashboard'){
        //进度条开始
        NProgress.start()
    }
    var userRoutes = [];
    // 登录token
    let token = getToken('token')
    //  token 过期时间
    const tokenStartTime = getToken('tokenStartTime')

    const timeOver = 3 * 3600 * 1000
    let date = new Date().getTime()
    if(date - tokenStartTime > timeOver) {
        token = null
    }   

    //是否有角色
    if(token){
        //添加任意路由
        userRoutes.unshift(...anyRouters)

        if(to.path === '/login'){
            next({ path: '/' })
            NProgress.done()
        }else{
            //获取用户名
            const hasGetUserInfo = store.getters.name
            if(hasGetUserInfo){
                next()
            }else{
                try{
                    const result = await store.dispatch('user/getInfo');
                    userRoutes[0].children.push(...filterAsyncRoutes(asyncRoutes, result.roles[0]));
                    console.log('4.后台返回路由信息和动态路由对比结果:',userRoutes);
                    // console.log(router);
                    store.commit("user/SET_ROLES", userRoutes);
                    // router.addRoutes(userRoutes); vue3弃用
                    userRoutes.forEach( r =>{
                        router.addRoute(r);
                    })
                    next({...to})
                }catch(error){
                    //移除token
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    //跳转到登录
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    }else{
        //没有token
        //当前路径是不需要验证白名单 放行
        if(whiteList.indexOf(to.path) !== -1 ){
            next()
        }else {
        //跳转到登录
        console.log('1111无token');
        next(`/login?redirect=${to.path}`)
        NProgress.done()
        }
    }
})



router.afterEach(() => {
    // 进度条结束
    NProgress.done()
  })