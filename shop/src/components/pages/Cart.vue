<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="购物车"/>
        </div>
        <div class="cart-title">
            <van-button size="small"  type="danger" @click="clearCart" plain>
                清空购物车
            </van-button>
        </div>
        <!--显示购物车中的商品-->
        <div class="cart-list">
            <div class="cart-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="cart-img">
                    <img :src="item.image" width="100%" />
                </div>
                <div class="cart-text">
                    <div class="cart-goods-name">{{item.name}}</div>
                    <div class="cart-control">
                        <van-stepper v-model="item.count" />
                    </div>
                </div>
                <div class="cart-goods-price">
                    <div>
                        ￥{{item.price | moneyFilter}}
                    </div>
                    <div>
                        x{{item.count}}
                    </div>
                    <div class="allPrice">
                        ￥{{item.price*item.count | moneyFilter}}
                    </div>
                </div>
            </div>
        </div>

        <!--显示总金额-->

        <div class="totalMoeny">
            商品总价:￥{{totalMoney | moneyFilter}}
        </div>
        <div class="cart-title">
          <van-button :loading="paying" type="info" loading-text="支付中..." @click="payMoney">
            结算
          </van-button>
        </div>
    </div>

</template>

<script>
    import { toMoney} from '@/filter/moneyFilter.js'
    import axios from "axios";
    import {Toast} from "vant";
    import url from "@/serviceAPI.config.js";
    export default {
       data() {
           return {
               cartInfo: [] ,
               isEmpty: false ,
                paying:false,
           }

       },
       created(){
           this.getCartInfo()
       },
       computed:{
           totalMoney(){
               let allMoney = 0
               this.cartInfo.forEach((item,index)=>{
                   allMoney += item.price*item.count
               })
              localStorage.cartInfo = JSON.stringify(this.cartInfo)
            return allMoney
           }
       },
       filters:{
           moneyFilter(money){
               return toMoney(money)
           }
       },
       methods: {
            //得到购物车数据的方法
            getCartInfo() {
                if(localStorage.cartInfo){
                    this.cartInfo=JSON.parse(localStorage.cartInfo)
                }
                console.log(' this.cartInfo:'+JSON.stringify(this.cartInfo))
                this.isEmpty=this.cartInfo.length>0 ?true : false

            },
            clearCart(){
                localStorage.removeItem('cartInfo')
                this.cartInfo=[]
            },

            payMoney(){
              if(this.cartInfo.length==0){
                Toast("购物车为空");
                return
              }
              if(!sessionStorage.getItem("userName")){
                Toast("请先登录");
                return
              }
             this.paying = true;
             axios({
               url: url.addOrder,
               method: "post",
               data: {
                 ORDER_DETAILS:localStorage.cartInfo,
                 AMOUNT:this.totalMoney,
                 ORDER_ID:this.orderCode(),
                 USER_NAME:sessionStorage.getItem('userName')
               },
             }).then(res=>{
               setTimeout(()=>{
                 this.paying = false;
                 this.show = false;
                 Toast.success('支付成功')
                 this.clearCart()
               },1000)
             })
          },
         orderCode() {
           var orderCode='';
           for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
           {
             orderCode += Math.floor(Math.random() * 10);
           }
           orderCode = new Date().getTime() + orderCode;  //时间戳，用来生成订单号。
           return orderCode;
         }
        },
    }
</script>

<style scoped>
.cart-title{
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
    text-align:right;

}

.cart-list{
    background-color: #fff;
}
.cart-row{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    padding:0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;
}

.cart-img{
    flex:6;
}
.cart-text{
    flex:14;
    padding-left:10px;
}
.cart-control{
    padding-top:10px;
}
.cart-goods-price{
    flex:4;
    text-align: right;
}
.allPrice{
    color:red;
}
.totalMoeny{
    text-align: right;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
}
</style>
