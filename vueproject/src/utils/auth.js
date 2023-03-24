// import Cookies from "js-cookie";


export function getToken(val){
    // return Cookies.get(TokenKey)
    return  localStorage.getItem(val)
}

export function setToken(val,token) {
  // let seconds = 10;
  // let expires = new Date(new Date() * 1 + seconds * 1000);
    console.log('2.设置token:'+token);
    // return Cookies.set(TokenKey, token,
    //   // { expires: expires } 过期时间
    //   )
    return  localStorage.setItem(val,token)
  }
  
export function removeToken(val) {
    // return Cookies.remove(TokenKey)
    return  localStorage.removeItem(val)
  }
