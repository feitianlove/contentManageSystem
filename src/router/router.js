import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/home.vue'
import Login from '../components/login/login.vue'
import Role from '../components/roles/Roles.vue'
import Right from '../components/right/Right.vue'
import User from '../components/user/User.vue'
import Categroy from '../components/categroies/categrolies.vue'
import Goods from '../components/goods/goods.vue'
import AddGoods from '../components/goods/GoodsAdd.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      'path': '/users/:id?',
      name: 'users',
      component: User
    },
    {
      'path': '/roles',
      name: 'roles',
      component: Role
    },
    {
      'path': '/rights',
      name: 'rights',
      component: Right
    }, {
      path: '/categories',
      component: Categroy
    }, {
      path: '/goods',
      component: Goods
    }, {
      path: '/addgoods',
      component: AddGoods
    }

    ]
  },
  {
    path: '/login',
    component: Login
  }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
