import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 完整导入ElementUI
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  // el: '#app',不需要导入
  router,
  store,
  render: h => h(App)
}).$mount('#app')
