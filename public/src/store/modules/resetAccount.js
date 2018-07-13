import { PASSWORD_RESET, PASSWORD_SEND_KEY, RESET_SUCCESS, RESET_ERROR, RESET_INIT } from '../actions/resetAccount'
import AuthService from '../../services/Auth'

const state = {
    step: 1,
    finalStep: false,
    status: ''
}

const getters = {
    getCurrentStep: state => state.step,
    resetCompleted: state => state.finalStep && state.status === 'reset-success'
}

const actions = {
    [PASSWORD_SEND_KEY]: ({ commit }, email) => {
        return new Promise((resolve, reject) => {
            commit(PASSWORD_SEND_KEY)

            AuthService.resetPasswordSendKey(email).then(resp => {
                commit(RESET_SUCCESS)

                resolve(resp)
            }).catch(error => {
                commit(RESET_ERROR, error)

                reject(error)
            })
        })
    },
    [PASSWORD_RESET]: ({ commit }, credentials) => {
        return new Promise((resolve, reject) => {
            commit(PASSWORD_RESET)

            AuthService.resetPassword(credentials).then(resp => {
                commit(RESET_SUCCESS)

                resolve(resp)
            }).catch(error => {
                commit(RESET_ERROR, error)

                reject(error)
            })
        })
    }
}

const mutations = {
    [PASSWORD_SEND_KEY]: (state) => {
        state.finalStep = false
        state.step = 1
        state.status = 'password-send-key'
    },
    [PASSWORD_RESET]: (state) => {
        state.finalStep = true
        state.status = 'password-reset'
    },
    [RESET_INIT]: (state) => {
        state.finalStep = false
        state.status = ''
        state.step = 1
    },
    [RESET_SUCCESS]: (state) => {
        state.step++
        state.status = 'reset-success'
    },
    [RESET_ERROR]: (state) => {
        state.status = 'reset-error'
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
