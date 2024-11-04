import Vue from 'vue'
import Router from 'vue-router'
import Store from '../components/Store.vue'
import Login from '../components/Login.vue'
import Details from '../components/Details.vue'
import Register from "../components/Register.vue";
import Search from "../components/SearchResult.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Store',
      component: Store,
      meta: {
        is_store: true
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        is_store: false
      }
    },
    {
      path: '/Details:id',
      name: 'Details',
      component: Details,
      meta: {
        is_store: false
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: {
        is_store: false
      }
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search,
      meta: {
        is_store: true
      }
    }
  ]
})
