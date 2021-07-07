import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')

const routes = [
  {
    path:'/login',
    component: Login
  },
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/home',
    component:Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  if(to.path === '/login') return next()
  if(!window.sessionStorage.getItem('token')) {
    return next('/login')
  }
  next()
})

export default router
