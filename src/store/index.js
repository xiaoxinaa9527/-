import Vue from 'vue'
import Vuex from 'vuex'

// 导入模块并注册
import user from '@/store/modules/user'

// 导入插件
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

// // 创建对象
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  modules: {
    user
  },
  plugins: [vuexLocal.plugin]
})
