<template>
    <div class="order">
      <van-nav-bar
        title="我的订单"
        left-text="返回"
        left-arrow
        @click-left="goBack"
      />
      <div class="order-box">
        <div class="order-item" v-for="(item,index) in orderData " :key="index">
          <div class="order-title">
            <p class="order-num">订单号：{{item.ORDER_ID}}</p>
            <p class="order-status">已完成</p>
          </div>
          <div class="goods-box">
            <div class="image-box">
              <div class='goods-item' v-for="(item1,index1) in JSON.parse(item.ORDER_DETAILS)" :key="index1">
                <img v-if="item1.IMAGE1" class="image-item"  :src="item1.IMAGE1" alt="">
                <img v-else class="image-item"  :src="item1.image" alt="">
                <p v-if="item1.NAME" style="text-align: center" >{{item1.NAME.length>4?item1.NAME.substring(0,4)+'...':item1.NAME}}</p>
                <p v-else style="text-align: center" >{{item1.Name.length>4?item1.Name.substring(0,4)+'...':item1.Name}}</p>
              </div>
            </div>

            <p><span>下单时间:{{rTime(item.createAt)}}</span> <span style="float: right">合计：￥{{item.AMOUNT|moneyFilter}}</span></p>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    import axios from "axios";
    import {Toast} from "vant";
    import url from "@/serviceAPI.config.js";
    import { toMoney } from "@/filter/moneyFilter";
    export default {
      name: "Order",
      data(){
        return{
          orderData:null
        }
      },
      filters: {
        moneyFilter(money) {
          return toMoney(money);
        },
      },
      created() {
        this.getOrderData()
      },
      methods:{
        getOrderData(){
          axios({
            url: url.getOrder,
            method: "post",
            data: {
              userName:sessionStorage.getItem('userName')
            },
          }).then(res=>{
            this.orderData= res.data.data
            console.log(this.orderData)
          })
        },
        goBack(){
          this.$router.go(-1)
        },


        rTime(date) {
          var json_date = new Date(date).toJSON();
          return new Date(+new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        }

      }
    }
</script>

<style scoped>
  .order-box{
    height: 92vh;
    overflow-y:auto ;
  }
  .order-item{
    width: 95%;
    margin: 5px  auto 0 auto;
    border-radius: 5px;
    background-color: white;
    min-height: 50px;
    font-size: 12px;
  }
  .order-title{
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 0px 5px;
    border-bottom:1px solid #969799;
  }
  .goods-box{
    padding: 5px;
  }
  .image-box{
   display: flex;
    width: 80%;
    overflow-x: auto;
  }
  .goods-item{
    width: 60px;
    margin-left: 5px;

  }
  .image-item{
    width: 60px;
    height: 60px;
  }
</style>
