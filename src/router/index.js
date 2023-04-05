import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  // 登录页和首页是一级路由
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/',
    // 重定向
    redirect: '/dashboard',
    component: () => import('@/views/Layout'),
    children: [
      { path: 'article', component: () => import('@/views/Article') },
      { path: 'dashboard', component: () => import('@/views/Dashboard') }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = store.state.user.token
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
