const Router = require ('koa-router')
const mongoose = require('mongoose')
let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})

router.post('/add',async(ctx)=>{

    const Order = mongoose.model('Order')

    // console.log(ctx.request.body,'ssss')
    let newOrder = new Order(ctx.request.body)

    await newOrder.save().then(()=>{
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(error=>{
        ctx.body={
            code:500,
            message:error
        }
    })
})
router.post('/get',async(ctx)=>{
    //得到前端传递过来的数据
    let USER_NAME = ctx.request.body.userName

    const Order = mongoose.model('Order')

    await Order.find({USER_NAME:USER_NAME}).exec().then(async(result)=>{
        if(result){
            ctx.body={ code:200, message:'',data:result}
        }else{
            ctx.body={ code:250, message:''}
        }

    }).catch(error=>{
        console.log(error)
        ctx.body={ code:500, message:error  }
    })
})
module.exports=router;
