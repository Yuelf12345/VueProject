const { admin , user} = require('./permission');


module.exports = {
    permission : async ctx=>{
        let { token }=ctx.query;
        console.log(token);
        if( token == 'admin'){
            return ctx.body = admin
        }
        else{
            return ctx.body = user
        }
    }
}