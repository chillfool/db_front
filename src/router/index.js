import Vue from 'vue'
import Router from 'vue-router'
import head from '../App.vue'
import login from '../components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'head',
      component: head
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
