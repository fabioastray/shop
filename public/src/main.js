// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
import 'babel-polyfill'
import 'es6-promise/auto'
import './utils/polyfills'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './assets/css/styles.css'

import router from './router'
import AuthenticatedView from './views/Authenticated'
import NotAuthenticatedView from './views/NotAuthenticated'
import store from './store'

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        AuthenticatedView,
        NotAuthenticatedView
    },
    render(h) {
        let component = store.getters.isAuthenticated ? AuthenticatedView : NotAuthenticatedView

        return h(component)
    }
})
