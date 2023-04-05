export default {
  namespaced: true, // 开启命名空间
  state: {
    token: ''
  },
  mutations: {
    updateToken(state, val) {
      state.token = val
      // 本地存储
    },
    removeToken(state) {
      state.token = ''
    }
  }
}
