import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'

import './assets/theme.less'

Vue.config.productionTip = false

Vue.prototype.$config = config

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
