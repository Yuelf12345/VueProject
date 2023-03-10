module.exports = {
    login :async ctx=>{
        let {username,password} = ctx.request.body;
        if(username == '11' && password !== ''){
            ctx.status = 200;
            return ctx.body = {
                code:2000,
                flag:true,
                message:"验证成功",
                data:{
                    token:"admin"
                }
            }
        }else if(username == '22' && password !== ''){
            ctx.status = 200;
            return ctx.body = {
                code:2000,
                flag:true,
                message:"验证成功",
                data:{
                    token:"user"
                }
            }
        }else{
            ctx.status = 404;
            return ctx.body = {
                code:4000,
                flag:false,
                message:"登录失败",
            }
        }
    },
};