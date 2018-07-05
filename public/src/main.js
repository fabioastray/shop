// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'babel-polyfill'
import './utils/polyfills'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import router from './router'
import AuthenticatedView from './views/Authenticated'
import NotAuthenticatedView from './views/NotAuthenticated'
import AuthService from './services/Auth'

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        AuthenticatedView,
        NotAuthenticatedView
    },
    render(h) {
        let component = AuthService.isAuthenticated() ? AuthenticatedView : NotAuthenticatedView

        return h(component)
    }
})
