// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'babel-polyfill'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import router from './router'
import App from './App'
import LoginPage from './components/LoginPage'
import Utils from './utils/utils'

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App,
        LoginPage
    },
    render(h) {
        const component = Utils.getCookie('user').length === 0 ? LoginPage : App
        return h(component)
    }
})
