import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import auth from './modules/auth'
import resetAccount from './modules/resetAccount'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        user,
        auth,
        resetAccount
    },
    strict: debug
})
