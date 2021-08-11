const BASEURL = "https://www.fastmock.site/mock/70b8671d958d3dfdabd7752eb2058dfe/shop/"
const LOCALURL = "http://localhost:3000/"
const URL ={
    getShoppingMallInfo:BASEURL+'index', //商城首页所有信息
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',//用户注册接口
    login:LOCALURL+'user/login',   //用户登录接口
    getDetailGoodsInfo : LOCALURL+'goods/getDetailGoodsInfo',  //获取商品详情
    getCategoryList:LOCALURL+'goods/getCategoryList',         //得到大类信息
    getCategorySubList:LOCALURL+'goods/getCategorySubList',   //得到小类信息
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',   //得到小类商品信息
    addOrder:LOCALURL+'order/add',//添加订单
    getOrder:LOCALURL+'order/get',//得到订单
}
module.exports = URL
