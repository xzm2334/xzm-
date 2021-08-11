const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    AMOUNT:{type:Number}, // 金额
    USER_NAME:{
        type:String
    }, // 用户名
    ORDER_DETAILS:{
        type:String,
    },
    ORDER_ID:{
        type:String,
        default:0,
    }, //订单号
    createAt:{type:Date, default:Date.now()},

})
mongoose.model('Order',OrderSchema)