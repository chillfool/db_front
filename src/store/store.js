import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({//进行过更改
  state: {
    isLoggedIn: true,
    userName: "user1",
    userId: null
  },
  mutations: {
    setIsLoggedIn(state,data) {
      state.isLoggedIn = data;
    },
    setUserName(state,data) {
      state.userName = data;
    },
    setUserId(state,data) {
      state.userId = data;
    }
  },
  actions: {
    setLogin({commit},data) {
      commit('setIsLoggedIn',data)
    },
    setUserName({commit},data) {
      commit('setUserName',data)
    },
    setUserId({commit},data) {
      commit('setUserId',data)
    }
  }
})
