import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import axios from "./Config/axios";


Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
axios.defaults.headers.common["Authorization"] = "Bearer " + store.state.token;

//Vue.prototype.$user = localStorage.getItem("user")

new Vue({
  el: '#app',
  router,
  store,
  
  icons,
  template: '<App/>',
  components: {
    App
  },

},
)

