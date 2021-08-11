import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import Member from '@/components/pages/Member'
import Order from '@/components/pages/Order'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/main',name: 'Main',component: Main,
      children:[
        {path: '/',name: 'ShoppingMall',component: ShoppingMall},
        {path: '/CategoryList',name: 'CategoryList',component: CategoryList},
        {path: '/Cart',name: 'Cart',component: Cart},
        {path:'/Member',name:'Member',component:Member},
      ]
    },
    {path:'/',redirect:'/main'},
    {path: '/register',name: 'Register',component: Register},
    {path: '/login',name: 'Login',component: Login},
    {path: '/Goods',name: 'Goods',component: Goods},
    {path:'/order', name:'Order',component:Order},
  ]
})
