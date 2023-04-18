const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');

const login = require('./api/login');
const user = require('./api/user');
const role = require('./api/roles');
const order = require('./api/order');

const server = new Koa();
const router = new Router();
//body 解析中间件
server.use(koaBody(
    {
        multipart:true,
        //处理上传的二进制文件
        formidable:{
            //上传目录 文件名后缀
            uploadDir:__dirname + '/public/upload',
            keepExtensions:true
        }
    }
));




router.get('/',(ctx,next)=>{
    ctx.body = '后台'
});
//登录信息
router.post('/login',login.login)
router.get('/info',login.getInfo)
router.post('/logout',login.logout)
router.put('/refresh_token/:refresh_token',login.refresh_token)

//用户信息
router.get('/user_list',user.getUserList)
router.get('/user_getPageList',user.getPageList)
router.get('/getUser/:roleId',user.getUser)
router.put('/changeUserStatus',user.changeUserStatus)
router.put('/upDateUser',user.upDateUser)
router.delete('/removeUser/:roleId',user.removeUser)

//角色信息
router.get('/role_list',role.getRolesList)
router.get('/role_getPageList',role.getPageList)
router.get('/getRole/:roleId',role.getRole)
router.put('/changeRoleStatus',role.changeRoleStatus)
router.put('/upDateRole',role.upDateRole)
router.delete('/removeRole/:roleId',role.removeRole)

// 订单信息
router.get('/order_list',order.getOrderList)
router.get('/getOrderList/:currentPage/:pageSize',order.getOrderList)
router.post('/addOrder',order.addOrder)
router.put('/upDataOrder',order.upDataOrder)
router.delete('/removeOrder/:id',order.removeOrder)
router.delete('/removeOrderAll',order.removeOrderAll)

server.use(router.routes());

server.listen(8081,()=>{
    console.log('服务器已启动: http://localhost:8081/');
})