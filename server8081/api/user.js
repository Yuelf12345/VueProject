const getData = require('../utils/dataList');


module.exports = {
    getUserList :async ctx => {
        let { search }=ctx.query
        console.log(ctx.query);
        return  ctx.body = {
            data:search
        }
    },

    getPageList:async ctx=>{
        let data = ctx.params
        const total= getData(20).length
        const dataList = getData(20).slice(
            ( data.currentPage - 1) * data.pageSize,
            data.currentPage * data.pageSize
       )
        return ctx.body = {
            code:2000,
            data:{
                dataList,
                total

            },
            msg: JSON.stringify(data) +' 获取成功 '
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