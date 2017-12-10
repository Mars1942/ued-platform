import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AdminMain from '@/components/AdminMain'
import UserList from '@/components/UserList'
import AppList from '@/components/AppList'
import RoleList from '@/components/RoleList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/login'},
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin-main',
      name: 'AdminMain',
      component: AdminMain,
      redirect:'/admin-main/user-list',
      children: [
        {
          path: 'user-list',
          component: UserList
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'app-list',
          component: AppList
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'role-list',
          component: RoleList
        }]
    }
  ]
})
