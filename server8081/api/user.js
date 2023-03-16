module.exports = {
    getUserList :async ctx => {
        let { search }=ctx.query
        console.log(ctx.query);
        return  ctx.body = {
            data:search
        }
    }
}