module.exports = {
    getUserList :async ctx => {
        let { search }=ctx.query
        console.log(ctx.query);
        return  ctx.body = {
            data:search
        }
    },


    removeUser:async ctx=>{
        let data = ctx.params
        return ctx.body = {
            code:2000,
            msg: '序号'+data.id+'  删除成功'
        }
    },

    removeUserAll:async ctx =>{
        let data = ctx.query
        return ctx.body = data
    }
}