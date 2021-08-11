<template>
    <div>
        <div>
            <van-nav-bar  title="会员中心" />
        </div>
        <div class="top">
           <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fshouyou.3dmgame.com%2Fuploadimg%2Fupload%2Fimage%2F20190112%2F20190112130259_40153.jpg&refer=http%3A%2F%2Fshouyou.3dmgame.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620688872&t=014e6adb092ac10fc7ab2c19283ca371" class="top-img" />
        </div>
        <div class="login">
            <div v-if="!userName"><van-button type="warning" @click="OnLogin">我要登录</van-button></div>
            <div v-if="!userName"><van-button type="primary" @click="OnRegister">我要注册</van-button></div>

            <div v-if="userName"><van-button type="warning" @click="outLogin">退出登录</van-button></div>
        </div>
        <div>
            <van-cell-group>
                <van-cell title="地址管理" is-link  />
                <van-cell title="我的订单" is-link  @click="$router.push('/order')" />
                <van-cell title="会员权益" is-link />
                <van-cell title="联系我们" is-link  />
            </van-cell-group>

        </div>

    </div>
</template>

<script>
    import {Toast} from "vant";

    export default {
      data(){
        return{
          userName:sessionStorage.getItem('userName')?sessionStorage.getItem('userName'):''
        }
      },

      created() {

      },

      methods:{
          OnLogin(){
              this.$router.push({name:'Login'})
          },
          OnRegister(){
              this.$router.push({name:'Register'})
          },
          outLogin(){
              sessionStorage.removeItem('userName')
              Toast.success('用户已退出')
              this.userName = '';
          }
      }
    }
</script>

<style scoped>
    .top-img{
        width:70px;
        height: 70px;
        border-radius: 50px;
    }
    .top{
        height:5rem;
        text-align: center;
        padding-top:2rem;
        background-color: #EEA2AD;
    }
    .login{
        display: flex;
        flex-direction: row;
        background-color: #fff;
        padding:10px;
    }
    .login div{
        flex:1;
        text-align: center;
    }
</style>
