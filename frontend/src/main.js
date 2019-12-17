import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

// tanpa menggunakan env
// axios.defaults.baseURL = 'http://localhost:2001/';

//menggunakan env
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
