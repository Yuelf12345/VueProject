//引入登录|退出登录|获取用户信息的接口函数
import { login } from '@/api/user'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//箭头函数
const getDefaultState = () => {
  return {
    //获取token
    token: '',
    //存储用户名
    name: '',
  }
}

const store = new Vuex.Store({
  store:getDefaultState(),
  mutations:{
    //重置state
    RESET_STATE: (state) => {
      Object.assign(state, getDefaultState())
    },
    //存储token
    SET_TOKEN: (state, token) => {
      state.token = token
    },
  },
  actions:{
    //这里在处理登录业务
    async login({ commit }, userInfo) {
      //解构出用户名与密码
      const { username, password } = userInfo;
      let result = await login({ username: username.trim(), password: password });
      console.log(result);
      // //注意：当前登录请求现在使用mock数据，mock数据code是20000
      // if(result.code==20000){
      //   //vuex存储token
      //   commit('SET_TOKEN',result.data.token);
      //   //本地持久化存储token
      //   setToken(result.data.token);
      //   return 'ok';
      // }else{
      //   return Promise.reject(new Error('faile'));
      // }
    },
  }
})

export default store;