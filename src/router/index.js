import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    //re
    path: '/',
    redirect:'/Home/home'
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
        meta:{index:1}
      },  {
        //音乐主界面 乐库
        path: 'library',
        component: () => import('main/library_page'),
        meta:{index:2}
      }, {
        //音乐主界面 云盘
        path: 'cloudDisk',
        component: () => import('main/cloudDisk_page'),
        meta:{index:3}
      },  {
        //音乐主界面 我的喜欢
        path: 'favorite',
        component: () => import('main/favorite_page'),
        meta:{index:4}
      }, {
        //音乐主界面 最近播放
        path: 'recently',
        component: () => import('main/recently_page'),
        meta:{index:5}
      }, {
        //音乐主界面 歌单广场
        path: 'playlist',
        component: () => import('main/playlist_page'),
        meta:{index:6}
      },{
        //音乐主界面 搜索
        path: 'search/:inputvalue',
        component: () => import('main/search_page'),
        props:true,
        meta:{index:7}
      },{
        //歌单详情页---------------Overwrite
        path: 'playlistDetail/:id',
        name:'playlistDetail',
        component: () => import('main/detail_page'),
        meta:{index:0}
      },{
      //专辑详情页---------------Overwrite
        path: 'albumDetail/:id',
        name:'albumDetail',
        component: () => import('main/detail_page'),
        meta:{index:0}
      },{
      //歌手详情页---------------Overwrite
        path: 'artistDetail/:id',
        name:'artistDetail',
        component: () => import('main/detail_page'),
        meta:{index:0}
      }
    ]
  },

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
