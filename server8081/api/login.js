const KoaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const VerifyPassword = require('../utils/VerifyPassword');

let User = [{
    id: 1,
    username: '11',
    password: '',
    roles: 'admin'
}, {
    id: 2,
    username: '22',
    password: '',
    roles: 'user'
}];

module.exports = {
    login: async ctx => {
        // 获取前端传入的账号密码
        let { username, password } = ctx.request.body;

        // 根据用户名查找密码
        findResult = User.find(u => u.username === username)
        //判断用户输入的密码和数据库密码是否一致
        const result = VerifyPassword(password, password);

        if (result) {
            //生成token
            let token = await GenerateToken(password,findResult.roles,60)
            // 生成刷新token
            let refresh_token = await GenerateToken(token,'',360)
            // 设置cookie
            ctx.cookies.set('vue', findResult.roles, {
                maxAge: 60 * 1000
            })

            return ctx.body = {
                code: 2000,
                flag: true,
                message: "验证成功",
                data: {
                    token: token,
                    refresh_token: refresh_token
                }
            }
        } else {
            ctx.status = 404;
            return ctx.body = {
                code: 4000,
                flag: false,
                message: "登录失败",
            }
        }
    },


    getInfo: async ctx => {
        let { token } = ctx.query

        if (token) {
            const tokenItem = jwt.verify(token, 'Yue')
            const { roles, time, timeout } = tokenItem
            let NewTime = new Date().getTime()
            if (NewTime - time <= timeout) {
                console.log('没过期');
                if (roles == 'admin') {
                    return ctx.body = {
                        code: 2000,
                        data: {
                            roles: ['admin'],
                            introduction: 'I am a super administrator',
                            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                            name: 'Super Admin',
                            btnPermissions: 'Admin'
                        }
                    }
                } else if (roles == 'user') {
                    return ctx.body = {
                        code: 2000,
                        data: {
                            roles: ['user'],
                            introduction: 'I am an user01',
                            avatar: 'https://img.soogif.com/1CMjb5x0EATQArD0vGJ1TionelKfOQ2r.gif',
                            name: 'Normal User',
                            btnPermissions: 'User'
                        }
                    }
                }
            } else {
                console.log('过期');
                // ctx.status = 401
                return ctx.body = {
                    code: 401,
                    message: 'Login failed, unable to get user details.'
                }
            }
        }
    },

    logout: async ctx => {
        return ctx.body = {
            code: 20000,
            data: 'success'
        }
    },

    refresh_token:async ctx =>{
        let {refresh_token} = ctx.params
        const tokenItem = jwt.verify(refresh_token, 'Yue')
        const { m, time, timeout } = tokenItem
        console.log('OldToken:',refresh_token,m);
        let NewTime = new Date().getTime()
        if (NewTime - time <= timeout){
            const tokenItem = jwt.verify(m, 'Yue')
            const { xm, roles, timeout } = tokenItem
            let token = await GenerateToken(xm,roles,timeout)
            let refresh_token = await GenerateToken(token,'',360)
            console.log('NewToken:',refresh_token,token);
            return ctx.body = {
                code: 2000,
                flag: true,
                message: "刷新token验证成功",
                data: {
                    token: token,
                    refresh_token: refresh_token
                }
            }
        }else{
            return ctx.body = {
                code:2000,
                message:'重新登录'
            }
        }
    }
};

async function  GenerateToken(m,r,t){
    // 生成token
    let payload = {m,roles:r,time:new Date().getTime(),timeout:1000 * t}
    // jwt加密
    let token = jwt.sign(payload, "Yue");

    return token
}