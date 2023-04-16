// const getData = require('../utils/dataList');
// const db = require('../utils/database');
const mysql = require("mysql2/promise");
// 连接数据库
let db;
~async function(){
    db = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'123456',
        database:'admin',
    })
}()

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
        let [rs] = await db.query("select * from `WorkOrder`where `isDel`= ?",[
            0
        ]);
        const getData = rs
        const total= getData.length
        const dataList = getData.slice(
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
    addUser:async ctx=>{
        let data = ctx.request.body
        let { FO_Num ,O_Num ,O_Status,P_Progress,C_Emission,C_Open,S_Avatar} = data
        C_Emission % 2 == 0 ? (S_Avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif') : (S_Avatar = 'https://img.soogif.com/1CMjb5x0EATQArD0vGJ1TionelKfOQ2r.gif');
        let rs = await db.query("insert into `WorkOrder` (`FO_Num`,`O_Num`,`O_Status`,`P_Progress`,`C_Emission`,`C_Open`,`S_Avatar`,`isDel`) value (?,?,?,?,?,?,?,?)",[
            FO_Num ,O_Num ,O_Status,P_Progress,C_Emission,C_Open,S_Avatar,0
        ]);
        return ctx.body = {
            code:2000,
            msg:'添加成功'
        }
    },
    upDataUser:async ctx=>{
        let data = ctx.request.body
        console.log(data.O_Num);
        await db.query("UPDATE `WorkOrder`SET `FO_Num`=?,`O_Num`=?,`O_Status`=?,`P_Progress`=?,`C_Emission`=?,`C_Open`=? WHERE id = ?",[
            data.FO_Num,data.O_Num,data.O_Status,data.P_Progress,data.C_Emission,data.C_Open,data.id
        ]);
        return ctx.body = {
            code:2000,
            msg:'更新成功'
        }
    },
    removeUser:async ctx=>{
        let data = ctx.params
        await db.query("UPDATE `WorkOrder`SET `isDel`=? WHERE id = ?",[
            1,data.id
        ]);
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