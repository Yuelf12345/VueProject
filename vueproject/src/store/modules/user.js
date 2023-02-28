//引入登录|退出登录|获取用户信息的接口函数
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'

//箭头函数
const getDefaultState = () => {
  return {
    //获取token
    token: '',
    //存储用户名
    name: '',
  }
}

const state = getDefaultState();

const mutations = {
    //重置state
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    //存储token
    SET_TOKEN: (state, token) => {
        state.token = token
    },
}

const actions =  {
    async login({ commit }, userInfo) {
        //解构出用户名与密码
        const { username, password } = userInfo;
        let result = await login({ username: username.trim(), password: password });
        console.log(result);
        if(result.state == 0){
          //vuex存储token
          commit('SET_TOKEN',result.token);
          //本地持久化存储token
          setToken(result.token);
          return 'ok'
        }else{
          return Promise.reject(new Error('faile'));
        }
      },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  