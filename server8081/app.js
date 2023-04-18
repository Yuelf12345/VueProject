const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');

const login = require('./api/login');
const user = require('./api/user');
const role = require('./api/roles');

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

//获取列表
router.get('/user_list',user.getUserList)
router.get('/getPageList/:currentPage/:pageSize',user.getPageList)
router.post('/addUser',user.addUser)
router.put('/upDataUser',user.upDataUser)
router.delete('/removeUser/:id',user.removeUser)
router.delete('/removeUserAll',user.removeUserAll)

//角色信息
router.get('/role_list',role.getRolesList)
router.get('/role_getPageList',role.getPageList)
router.get('/getRole/:roleId',role.getRole)
router.put('/changeRoleStatus',role.changeRoleStatus)
router.put('/upDateRole',role.upDateRole)
router.delete('/removeRole/:roleId',role.removeRole)

server.use(router.routes());

server.listen(8081,()=>{
    console.log('服务器已启动: http://localhost:8081/');
})