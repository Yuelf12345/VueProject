module.exports = {
    login :async ctx=>{
        let {username,password} = ctx.request.body;
        if(username == '12' && password !== '11'){
            ctx.status = 200;
            return ctx.body = {
                state: 0,
                msg: '登录成功',
                token:'admin'
            }
        }else if(username == '22' && password == '22'){
            ctx.status = 200;
            return ctx.body = {
                state: 1,
                msg: '重新登录',
                token:'admin2'
            }
        }else{
            ctx.status = 404;
            return ctx.body = {
                state: 2,
                msg: '登录失败'
            }
        }
    }
};