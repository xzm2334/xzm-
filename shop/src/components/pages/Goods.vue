<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" />
    </div>
    <div class="goods-name">{{ goodsInfo.NAME }}</div>
    <div class="goods-price">
      价格：￥{{ goodsInfo.PRESENT_PRICE | moneyFilter }}元
    </div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论"> 评论 </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger" @click="buyGoods">直接购买</van-button>
      </div>
    </div>
    <van-action-sheet v-model="show" title="提交订单">
      <div class="content">
        <div class="cart-list">
          <div class="cart-row">
            <div class="cart-img">
              <img :src="goodsInfo.IMAGE1" width="100%" />
            </div>
            <div class="cart-text">
              <div class="cart-goods-name">{{goodsInfo.NAME}}</div>
              <div class="cart-control">
                <van-stepper v-model="goodsInfo.COUNT" />
              </div>
            </div>
            <div class="cart-goods-price">
              <div>
                ￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}
              </div>
              <div>
                x{{goodsInfo.COUNT}}
              </div>
              <div class="allPrice">
                ￥{{goodsInfo.PRESENT_PRICE*goodsInfo.COUNT | moneyFilter}}
              </div>
            </div>
          </div>
        </div>
        <!--显示总金额-->
        <div class="cart-title">
          <van-button :loading="paying" type="info" loading-text="支付中..." @click="payMoney">
            结算
          </van-button>
        </div>
      </div>
    </van-action-sheet>
    <van-loading type="spinner" />
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { toMoney } from "@/filter/moneyFilter";
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {}, //商品详细信息
      show:false,
      paying:false,
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  created() {
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    console.log(this.goodsId);
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId,
        },
      })
        .then((response) => {
          if (response.data.code == 200 && response.data.message) {
            this.goodsInfo = response.data.message;
          } else {
            Toast("服务器错误");
          }
          console.log(this.goodsInfo);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    addGoodsToCart() {
      if(!sessionStorage.getItem('userName')){
        Toast.fail('请先登录')
        return
      }
      //取出购物车内的商品数据
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      //判断购物车内是否已经有这个商品
      //如果没有返回undeifnd，如果有返回第一个查找到的数据
      let isHaveGoods = cartInfo.find((cart) => cart.goodsId == this.goodsId);
      console.log(isHaveGoods);
      if (!isHaveGoods) {
        //没有商品直接添加到数组中
        //重新组成添加到购物车的信息
        let newGoodsInfo={
            goodsId:this.goodsInfo.ID,
            Name:this.goodsInfo.NAME,
            price:this.goodsInfo.PRESENT_PRICE,
            image:this.goodsInfo.IMAGE1,
            count:1
    };
        cartInfo.push(newGoodsInfo); //添加到购物车
        localStorage.cartInfo = JSON.stringify(cartInfo); //操作本地数据
        Toast.success("添加成功");
      } else {
        Toast.success("已有此商品");
      }
      this.$router.push({ name: "Cart" }); //进行跳转
    },
    buyGoods(){
      if(!sessionStorage.getItem('userName')){
        Toast.fail('请先登录')
        return
      }
      this.show = true
    },
    payMoney(){
      this.paying = true;
      axios({
        url: url.addOrder,
        method: "post",
        data: {
          ORDER_DETAILS:JSON.stringify([this.goodsInfo]),
          AMOUNT:this.goodsInfo.PRESENT_PRICE*this.goodsInfo.COUNT,
          ORDER_ID:this.orderCode(),
          USER_NAME:sessionStorage.getItem('userName')
        },
      }).then(res=>{
          setTimeout(()=>{
            this.paying = false;
            this.show = false;
            Toast.success('支付成功')
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
};
</script>

<style scoped>
.detail {
  font-size: 0px;
}
.content {
  padding: 16px;
  height: 50vh;
}
.goods-name {
  background-color: #fff;
}
.goods-price {
  background-color: #fff;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom > div {
  flex: 1;
  padding: 5px;
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
.cart-title{
  text-align: right;
}
.totalMoeny{
  text-align: right;
  background-color: #fff;
  border-bottom:1px solid #E4E7ED;
  padding:5px;
}
</style>
