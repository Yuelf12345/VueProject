import axios from 'axios'

axios.create({
    timeout: 8000,
    baseURL:
      process.env.NODE_ENV === "development" ? "/api" : "http://localhost:8081/"
  });
  
export  function login({username , password}){
    console.log(username,password);
    // 接受后端数据
    let rs  =  axios.post("/api/login",{
        username,
        password
    });
    return rs
}