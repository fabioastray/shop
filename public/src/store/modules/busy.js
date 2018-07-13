import { HTTP_REQUEST_START, HTTP_REQUEST_STOP } from '../actions/loading'

const state = {
    httpRequestInProgress: false
}

const getters = {
    isBusy: state => state.httpRequestInProgress
}

const actions = {}

const mutations = {
    [HTTP_REQUEST_START]: (state) => {
        state.httpRequestInProgress = true
    },
    [HTTP_REQUEST_STOP]: (state) => {
        state.httpRequestInProgress = false
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
