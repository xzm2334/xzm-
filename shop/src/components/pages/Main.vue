<template>
    <div>
        <div class="main-div">
         <keep-alive>
         <router-view/>
         </keep-alive>
        </div>

        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表页</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" info="20">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                nowpath:'',
            }
        },
        created(){
            this.changeTabBarActive()
            },
        methods: {
            changeTabBarActive(){
                this.nowPath=this.$route.path
                if(this.nowPath=='/Cart'){
                    this.active=2;
    }
},
            changeTabbar(active) {

                switch(active){
                    case 0:
                        this.$router.push({name:'ShoppingMall'})
                        break;
                    case 1:
                        this.$router.push({name:'CategoryList'})
                        break;
                    case 2:
                        this.$router.push({name:'Cart'})
                        break;
                    case 3:
                        if(sessionStorage.getItem("userName")){
                          this.$router.push({name:'Member'})
                        }else{
                          this.$router.push({name:'Login'})
                        }
                        break;
                }
            }
        },
    }
</script>

<style scoped>
    .main-div{
        padding-bottom:50px ;
    }
</style>
