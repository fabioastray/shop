import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user'
import { AUTH_LOGOUT } from '../actions/auth'
import UserService from '../../services/User'
import Vue from 'vue'

const state = {
    status: '',
    profile: {}
}

const getters = {
    getProfile: state => state.profile,
    isProfileLoaded: state => Object.keys(state.profile).length > 0
}

const actions = {
    [USER_REQUEST]: ({ commit, dispatch }) => {
        commit(USER_REQUEST)
        const userService = new UserService()

        userService.me().then(resp => commit(USER_SUCCESS, resp))
            .catch(resp => {
                // commit(USER_ERROR, resp)
                //
                // dispatch(AUTH_LOGOUT)
            })
    }
}

const mutations = {
    [USER_REQUEST]: state => {
        state.status = 'loading'
    },
    [USER_SUCCESS]: (state, resp) => {
        state.status = 'success'
        Vue.set(state, 'profile', resp)
    },
    [USER_ERROR]: state => {
        state.status = 'error'
    },
    [AUTH_LOGOUT]: state => {
        state.profile = {}
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
