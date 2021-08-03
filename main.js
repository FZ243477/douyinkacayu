import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
import pageHead from './components/page-head.vue'
import member from './common/common.js'
Vue.prototype.$member = member;
Vue.component('page-head',pageHead)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
