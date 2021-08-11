const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    ID:{unique:true,type:String},
    MALL_CATEGORY_NAME:{type:String},   
    SORT:{type:Number},
})
mongoose.model('Category',categorySchema)