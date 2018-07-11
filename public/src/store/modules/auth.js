import { AUTH_ERROR, AUTH_LOGOUT, AUTH_REGISTER, AUTH_SUCCESS } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import { authorization } from '../../constants/auth'
import AuthService from '../../services/Auth'
import Axios from 'axios'

const state = {
    token: localStorage.getItem(authorization.localStorageKey) || '',
    status: ''
}

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
}

const actions = {
    [AUTH_REGISTER]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REGISTER)

            AuthService.register(user).then(resp => {
                const token = resp.token
                localStorage.setItem(authorization.localStorageKey, token)

                Axios.defaults.headers.common[authorization.headerKey] = token

                commit(AUTH_SUCCESS, token)
                dispatch(USER_REQUEST)

                resolve(resp)
            }).catch(error => {
                commit(AUTH_ERROR, error)

                localStorage.removeItem(authorization.localStorageKey)

                if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
                    dispatch(AUTH_LOGOUT)
                }

                reject(error.response.data)
            })
        })
    },
    [AUTH_LOGOUT]: ({ commit, dispatch }) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT)
            localStorage.removeItem(authorization.localStorageKey)
            delete Axios.defaults.headers.common[authorization.headerKey]
            resolve()
        })
    }
}

const mutations = {
    [AUTH_REGISTER]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.status = 'success'
        state.token = token
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = ''
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}