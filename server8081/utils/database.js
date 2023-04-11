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

module.exports = db