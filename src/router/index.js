import Vue from 'vue'
import Router from 'vue-router'
import FirstPage from '@/components/FirstPage'
import NavMenu from '@/components/NavMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'firstPage',
      component: FirstPage
    },
    {
      path: '/menu',
      name: 'NavMenu',
      component: NavMenu
    }
  ]
})
