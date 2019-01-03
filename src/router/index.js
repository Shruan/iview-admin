import Vue from 'vue'
import Router from 'vue-router'
import routers from './routers'

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  routes: routers
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(to => {

})

export default router
