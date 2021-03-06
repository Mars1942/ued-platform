import Vue from 'vue'
import Router from 'vue-router'
import PrePage from '@/components/pre/PrePage'
import Login from '@/components/login/Login'
import AdminMain from '@/components/AdminMain'
import UserList from '@/components/user/UserList'
import UserForm from '@/components/user/UserForm'
import AppList from '@/components/app/AppList'
import AppForm from '@/components/app/AppForm'
import RoleList from '@/components/role/RoleList'
import RoleForm from '@/components/role/RoleForm'
import CourseList from '@/components/course/CourseList'
import CourseForm from '@/components/course/CourseForm'
import CourseSelectList from '@/components/course/CourseSelectList'
import CourseMyList from '@/components/course/CourseMyList'
import CourseToUserList from '@/components/course/CourseToUserList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/',component:PrePage},
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin-main',
      name: 'AdminMain',
      component: AdminMain,
      children: [
        {
          path: 'user-list',
          component: UserList
        },
        {
          path:'user-form',
          name:'userForm',
          component:UserForm
        },
        {
          path: 'app-list',
          component: AppList
        },
        {
          path:'app-form',
          name:'appForm',
          component:AppForm
        },
        {
          path: 'role-list',
          component: RoleList
        },
        {
          path:'role-form',
          name:'roleForm',
          component:RoleForm
        },
        {
          path: 'course-list',
          component: CourseList
        },
        {
          path: 'course-select',
          name:'courseSelectList',
          component: CourseSelectList
        },
        {
          path: 'course-my-list',
          name:'courseMyList',
          component: CourseMyList
        },
        {
          path: 'course-to-userList',
          name:'courseToUserList',
          component: CourseToUserList
        },
        {
          path:'course-form',
          name:'courseForm',
          component:CourseForm
        },
      ]
    }
  ]
})
