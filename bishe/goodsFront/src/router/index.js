import Vue from 'vue'
import Router from 'vue-router'

//模块
import Main from '@/components/Main'
import Personal from '@/components/Personal'
import Home from '@/components/Home'
import Publish from '@/components/Publish'
import GoodsInfo from '@/components/GoodsInfo'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Published from '@/components/Published'
import Setting from '@/components/Setting'
import SetMain from '@/components/SetMain'
import SetInfo from '@/components/SetInfo'
import SetPass from '@/components/SetPass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children:[
        {
          path:"",component:Home
        },
        {
          path:"/personal",component:Personal
        }
      ]
    },
    {
      path:'/goodsInfo/:gid',
      name:'GoodsInfo',
      component:GoodsInfo
    },{
      path:'/personal',
      name:'Personal',
      component:Personal,
      children:[
        {path:"/published",component:Published}
      ]
    },
    {
      path:"/login",
      name:"Login",component:Login
    },
    {
      path:"/register",
      name:"Register",component:Register
    },
    {
      path:"/publish",component:Publish,
      beforeEnter(to,from,next){
        if(sessionStorage.getItem("userFront")){
          next()
        }else{
          next("/login")
        }
      }
    },
    {
      path:"/setting",component:Setting,children:[
        {path:"/",component:SetMain},
        {path:"/setInfo",component:SetInfo},
        {path:"/setPass",component:SetPass}
      ],
      beforeEnter(to,from,next){
        if(sessionStorage.getItem("userFront")){
          next()
        }else{
          next("/login")
        }
      }
    }
  ]
})
