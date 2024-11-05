import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({//进行过更改
  state: {
    isLoggedIn: false,
    userName: "user1"
  },
  mutations: {
    setIsLoggedIn(state,data) {
      state.isLoggedIn = data;
    },
    setUserName(state,data) {
      state.userName = data;
    }
  },
  actions: {
    setLogin({commit},data) {
      commit('setIsLoggedIn',data)
    },//设置用户名
    setUserName({commit},data) {
      commit('setUserName',data)
    }
  }
})
