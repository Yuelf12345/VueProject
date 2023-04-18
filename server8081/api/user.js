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
    getUserList : async ctx=>{
        return ctx.body = {
            code:2000,
        }
    },
    getPageList: async ctx =>{
        let data = ctx.query
        let [rs] = await db.query(`select * from sys_role where isDel= ? AND roleName like "%${data["queryParams[roleName]"]}%" AND roleKey like "%${data["queryParams[roleKey]"]}%" AND status like "%${data["queryParams[status]"]}%"` ,[
            0
        ]);
        return ctx.body = {
            code:2000,
            data:{
                rows:rs
            }
        }
    },
    addUser: async ctx =>{
        return ctx.body = {
            code:2000
        }
    },
    getUser:async ctx =>{
        let data = ctx.params
        let [rs] = await db.query("select * from `sys_role`where `isDel`= ? and `roleId` = ?",[
            0,data.roleId
        ]);
        return ctx.body = {
            code:2000,
            data:rs
        }
    },
    changeUserStatus:async ctx=>{
        let data = ctx.request.body
        console.log(data);
        await db.query("UPDATE `sys_role`SET `status`=? WHERE roleId = ?",[
            data.status,data.roleId
        ]);
        return ctx.body = {
            code:2000,
            msg:'角色'+data.roleName+'状态更新成功'
        }
    },
    upDateUser:async ctx =>{
        let data = ctx.request.body
        await db.query("UPDATE `sys_role`SET `roleName`=?,`roleKey`=?,`status`=?,`remark`=? WHERE roleId = ?",[
            data.roleName,data.roleKey,data.status,data.remark,data.roleId
        ]);
        return ctx.body = {
            code:2000,
            msg:'角色'+data.roleName+'更新成功'
        }
    },
    removeUser:async ctx =>{
        let data = ctx.params
        await db.query("UPDATE `sys_role`SET `isDel`=? WHERE roleId = ?",[
            1,data.roleId
        ]);
        return ctx.body = {
            code:2000,
            msg: '序号'+data.roleId+'  删除成功'
        }
    },
}