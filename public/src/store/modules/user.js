import { USER_REQUEST, USER_ERROR, USER_SUCCESS, USER_UPDATE_PROFILE } from '../actions/user'
import { AUTH_LOGOUT } from '../actions/auth'
import UserService from '../../services/User'
import Vue from 'vue'
import Utils from '../../utils/utils'

const state = {
    status: '',
    profile: {}
}

const getters = {
    profile: state => state.profile,
    isProfileLoaded: state => Object.keys(state.profile).length > 0
}

const actions = {
    [USER_REQUEST]: ({ commit, dispatch }) => {
        commit(USER_REQUEST)
        const userService = new UserService()

        return new Promise((resolve, reject) => {
            userService.me()
                .then(resp => {
                    commit(USER_SUCCESS, resp)
                    resolve(resp)
                })
                .catch(error => {
                    commit(USER_ERROR, error)
                    reject(error)
                })
        })
    },
    [USER_UPDATE_PROFILE]: ({ commit, dispatch }, user) => {
        commit(USER_UPDATE_PROFILE)
        const userService = new UserService()

        return new Promise((resolve, reject) => {
            userService.update(user)
                .then(resp => {
                    commit(USER_SUCCESS, resp)
                    resolve(resp)
                })
                .catch(error => {
                    commit(USER_ERROR, error)
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
        // clearing browser's cache to reflect change immediately
        resp.avatar.url += `?${Utils.getRandomInt(1000)}`

        Vue.set(state, 'profile', resp)
    },
    [USER_ERROR]: state => {
        state.status = 'error'
    },
    [AUTH_LOGOUT]: state => {
        state.profile = {}
    },
    [USER_UPDATE_PROFILE]: state => {
        state.status = 'updating profile'
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
