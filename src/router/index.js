import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { isEmptyObj } from '@/utils/index'
/* Layout */
import Layout from '@/views/layout/layout.vue'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'iconfont icon-home-index'
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  routes: constantRoutes
})

const router = createRouter()

function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

/**
 * meta: {
 *  role: 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 * }
 */
/* 权限路由：roles: SUPER_ADMIN: 超级管理员，ADMIN: 管理员 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    meta: {
      title: '权限测试',
      icon: 'iconfont icon-home-index'
    },
    children: [
      {
        path: 'superAdmin',
        name: 'superAdmin',
        component: () => import('@/views/permission/superAdmin.vue'),
        meta: {
          title: '超级管理员权限',
          roles: ['SUPER_ADMIN']
        }
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/permission/admin.vue'),
        meta: {
          title: '管理员权限',
          roles: ['ADMIN']
        }
      },
      {
        path: 'all',
        name: 'all',
        component: () => import('@/views/permission/all.vue'),
        meta: {
          title: '所有权限'
          // roles: ['SUPER_ADMIN', 'ADMIN'] // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

router.beforeEach((to, from, next) => {
  if (!getToken() && to.name !== 'login') {
    // 未登录且要跳转的页面不是登录页
    next({ name: 'login' }) // 跳转登录页
  } else if (!getToken() && to.name === 'login') {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (getToken() && to.name === 'login') {
    // 已登录且要跳转的页面是登录页
    next({ name: 'index' }) // 跳转首页
  } else {
    // 判断当前用户是否已经拉取完用户信
    if (isEmptyObj(store.getters.operatorBean)) {
      store.dispatch('getUserInfo').then(response => {
        /** TODO */
        store.dispatch('generateRoutes', response.operatorBean.roleType).then(accessedRoutes => {
          resetRouter() // 重置router避免name重名
          router.addRoutes(accessedRoutes) // 根据用户角色，动态添加权限路由
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      }).catch(err => {
        store.dispatch('fedLogOut').then(() => {
          console.log(err)
          next({ name: 'login' })
        })
      })
    } else {
      next()
    }
  }
})

export default router
