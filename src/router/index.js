import Vue from 'vue'
import Router from 'vue-router'
import routers from './routers'
import iView from 'iview'
import store from '@/store'

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  routes: routers
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  if (to.name === 'Layout') {
    store.dispatch('menu/_GetMenuList')
  }
  next()
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
