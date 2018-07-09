import {AUTH_ERROR, AUTH_LOGOUT, AUTH_REGISTER, AUTH_SUCCESS, AUTH_TOKEN_KEY} from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import AuthService from '../../services/Auth'
import Axios from 'axios'

const state = {
    token: localStorage.getItem(AUTH_TOKEN_KEY) || '',
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
                localStorage.setItem(AUTH_TOKEN_KEY, token)

                Axios.defaults.headers.common['Authorization'] = token

                commit(AUTH_SUCCESS, token)
                dispatch(USER_REQUEST)

                resolve(resp)
            }).catch(err => {
                commit(AUTH_ERROR, err)

                localStorage.removeItem(AUTH_TOKEN_KEY)

                reject(err)
            })
        })
    },
    [AUTH_LOGOUT]: ({ commit, dispatch }) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT)
            localStorage.removeItem(AUTH_TOKEN_KEY)
            delete Axios.defaults.headers.common['Authorization']
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
