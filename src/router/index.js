import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AdminMain from '@/components/AdminMain'
import UserList from '@/components/UserList'
import AppList from '@/components/AppList'
import RoleList from '@/components/RoleList'
import CourseList from '@/components/CourseList'

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
          path: 'app-list',
          component: AppList
        },
        {
          path: 'role-list',
          component: RoleList
        },
        {
          path: 'course-list',
          component: CourseList
        }]
    }
  ]
})
