// import axios from 'axios'

// axios.create({
//     timeout: 8000,
//     baseURL:
//       process.env.NODE_ENV === "development" ? "/api" : "http://localhost:8081/"
//   });
  
// export  function login({username , password}){
//     console.log(username,password);
//     // 接受后端数据
//     let rs  =  axios.post("/api/login",{
//         username,
//         password
//     });
//     return rs
// }

// 封装axios
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken,setToken,removeToken } from '@/utils/auth'
import router, {resetRouter} from '@/router'
import { refreshToken } from '@/api/user'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, 
    // withCredentials: true, 
    timeout: 5000 
})

// 请求拦截
service.interceptors.request.use(
    config => {
        let tk = getToken('token')
        if (store.getters.token) {
            config.headers.Authorization = tk
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)
// 响应拦截
service.interceptors.response.use(
    async response => {
        const res = response.data
        if (res.code === 401) {
            // 证明 Token 过期了
            // 1. 强制跳转到登录页
            // router.replace('/').catch(() =>{})
            // 2. 清空 vuex 和 localStorage 中的数据
            removeToken('token')
            resetRouter()
            store.commit('user/RESET_USERINFO')
            let refresh_token = getToken('refresh_token')
            if (res.code === 401 && refresh_token){
                let result = await refreshToken(refresh_token);
                result = result.data
                console.log('刷新结果',result);
                if (result.code == 2000) {
                    //vuex存储token
                    store.commit('user/SET_TOKEN', result.data.token);
                    store.commit('user/SET_RefreshTOKEN',result.data.refresh_token)
                    //本地持久化存储token
                    setToken('token',result.data.token);
                    setToken('refresh_token',result.data.refresh_token);
                    setToken('tokenStartTime',new Date().getTime());
                    return 'ok'
                  } else {
                    return Promise.reject(new Error('fail'));
                }
            }
        }
        return response
     },
     error => {
         return Promise.reject(error)
      })


export default service