import Vue from 'vue'
import App from './App'
import Store from './store'
import navBar  from './assets/css/nav_bar.css'

Vue.config.productionTip = false
Vue.prototype.$store = Store

const app = new Vue(App)
app.$mount()
