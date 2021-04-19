import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    //re
    path: '/',
    redirect:'/Home'
  },
  {
    //根路径
    path: '/Home',
    component: () => import('views/Home'),
    children:[
      {
        //音乐主界面 首页
        path: 'home',
        component: () => import('main/home_page'),
      },
      {
        //音乐主界面 乐库
        path: 'search',
        component: () => import('main/search_page'),
      },
      {
        //音乐主界面 云盘
        path: 'cloudDisk',
        component: () => import('main/cloudDisk_page'),
      },
      {
        //音乐主界面 我的喜欢
        path: 'favorite',
        component: () => import('main/favorite_page'),
      },
      {
        //音乐主界面 搜索
        path: 'favorite',
        component: () => import('main/favorite_page'),
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
