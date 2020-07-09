// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './js/store'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VS2 from 'vue-script2'
import modal from '@/components/modal/'
import global from './js/global';
import './css/reset.css'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(global)
Vue.use(VS2)
Vue.use(modal)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


