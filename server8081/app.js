const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');

const server = new Koa();
const router = new Router();

router.get('/',(ctx,next)=>{
    ctx.body = '后台'
});
router.post('/login',koaBody({
    multipart:true
}),async ctx=>{
    let {username,password} = ctx.request.body;
    if(username && password){
        ctx.status = 200;
        return ctx.body = {
            state: 0,
            msg: '登录成功'
        }
    }
})

server.use(router.routes());

server.listen(8081,()=>{
    console.log('服务器已启动: http://localhost:8081/');
})