import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/pages/homepage'
import Post from '@/pages/post'
import Myinfo from '@/pages/myinfo'
import SendQuestion from '@/pages/sendQuestion'
import SendShare from '@/pages/sendShare'
import SendComment from '@/pages/sendComment'
import Thread from '@/pages/thread'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component: Myinfo
    },
    {
      path: '/sendQuestion',
      name: 'SendQuestion',
      component: SendQuestion
    },
    {
      path: '/sendShare',
      name: 'SendShare',
      component: SendShare
    },
    {
      path: '/sendComment/:id',
      name: 'SendComment',
      component: SendComment
    },
    {
      path: '/thread/:id',
      name: 'thread',
      component: Thread
    }
    
  ]
})
