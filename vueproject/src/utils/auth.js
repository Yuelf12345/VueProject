import Cookies from "js-cookie";

const TokenKey = 'vue_admin_template_token'

export function getToken(){
    return Cookies.get(TokenKey)
}

export function setToken(token) {
  // let seconds = 10;
  // let expires = new Date(new Date() * 1 + seconds * 1000);
    console.log('2.设置token:'+TokenKey,token);
    return Cookies.set(TokenKey, token,
      // { expires: expires } 过期时间
      )
  }
  
export function removeToken() {
    return Cookies.remove(TokenKey)
  }