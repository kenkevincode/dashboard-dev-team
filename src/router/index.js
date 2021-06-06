import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../auth/SignIn.vue'
import SignUp from '../auth/SignUp.vue'
import PeopleDashboard from '../views/PeopleDashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/registr',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/dashboard',
    name: 'PeopleDashboard',
    component: PeopleDashboard
  }
]

const router = new VueRouter({
  routes
})

export default router
