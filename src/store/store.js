import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: true,
    userName: "user1"
  },
  mutations: {
    setIsLoggedIn(state,data) {
      state.isLoggedIn = false;
    }
  },
  actions: {
    setLogin({commit},data) {
      commit('setIsLoggedIn',data)
    }
  }
})
