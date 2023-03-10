const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');

const user = require('./api/user');
const userRouter = require('./api/userRouter');

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
router.post('/login',user.login)
// router.get('/info',user.getInfo)
// router.post('/logout',user.logout)
router.get('/permission',userRouter.permission)


server.use(router.routes());

server.listen(8081,()=>{
    console.log('服务器已启动: http://localhost:8081/');
})