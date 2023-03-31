//引入登录|退出登录|获取用户信息的接口函数
import { login, logout, getInfo } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
import { anyRouters, resetRouter, asyncRoutes, constantRoutes } from '@/router'
import router from '@/router';

const state = {
  //获取token
  token: getToken('token'),
  //存储用户名
  name: '',
  //存储用户头像
  avatar: '',
  //角色信息
  roles: [],
  //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由】
  resultAsyncRoutes: [],
  // 角色路由
  resultAllRoutes: []
}

const mutations = {
  //重置state
  // RESET_STATE: (state) => {
  //     Object.assign(state, getDefaultState())
  // },
  //存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  //设置用户信息
  SET_USERINFO: (state, userInfo) => {
    //用户名
    state.name = userInfo.name;
    //用户头像
    state.avatar = userInfo.avatar;
    //角色
    state.roles = userInfo.roles;
  },
  // 移除用户信息
  RESET_USERINFO: (state) => {
    //用户名
    state.name = '';
    //用户头像
    state.avatar = '';
    //角色
    state.roles = '';
  },
  // 存储路由
  SET_ROLES: (state,routes) => {
    state.resultAsyncRoutes = routes
  },
  // 移除路由
  RESET_ROLES: (state) => {
    state.resultAsyncRoutes = []
  },


}


const actions = {
  async login({ commit }, userInfo) {
    //解构出用户名与密码
    const { username, password } = userInfo;

    let result = await login({ username: username.trim(), password: password });
    result = result.data
    // let result = await login({ username: this.$md5(username.trim()), password: this.$md5(password) });
    console.log('1.后端返回登录结果:' + JSON.stringify(result));
    console.log(result.code,result.data.token);
    if (result.code == 2000) {
      //vuex存储token
      commit('SET_TOKEN', result.data.token);
      //本地持久化存储token
      setToken('token',result.data.token);
      setToken('tokenStartTime',new Date().getTime());
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'));
    }
  },

  //获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response.data;
        console.log('3.后端返回用户信息:' + JSON.stringify(data));
        commit('SET_USERINFO', data);
        setToken('role',data.roles);
        setToken("btnPermissions",data.btnPermissions);
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //退出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken('token')
        resetRouter()
        commit('RESET_USERINFO')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  //移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken()
      // commit('RESET_STATE')
      commit('RESET_USERINFO')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
