import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import { init } from '@/firebase/auth'

Vue.config.productionTip = false

// init().then(() => {
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
// })
