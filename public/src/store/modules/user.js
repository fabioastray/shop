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

        return new Promise((resolve, reject) => {
            userService.me().then(resp => {
                commit(USER_SUCCESS, resp)
                resolve(resp)
            })
            .catch(error => {
                commit(USER_ERROR, error)
                dispatch(AUTH_LOGOUT)
                reject(error)
            })
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
