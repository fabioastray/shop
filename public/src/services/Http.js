import Axios from 'axios'
import { authorization } from '../constants/auth'
import { HTTP_REQUEST_START, HTTP_REQUEST_STOP } from '../store/actions/loading'
import store from '../store/index'

export default class Http {
    constructor() {
        const defaultConfig = {
            timeout: 3000,
            baseURL: 'http://localhost:8083'
        }
        this.http = Axios.create(defaultConfig)

        if (this.http.interceptors.response.handlers.length === 0) {
            this.http.interceptors.response.use(this.okResponseInterceptor, this.errorResponseInterceptor)
        }

        if (this.http.interceptors.request.handlers.length === 0) {
            this.http.interceptors.request.use(this.okRequestInterceptor, this.errorRequestInterceptor)
        }

        const token = localStorage.getItem(authorization.localStorageKey)
        if (token) {
            this.http.defaults.headers.common[authorization.headerKey] = token
        }
    }

    okRequestInterceptor(config) {
        store.commit(HTTP_REQUEST_START)
        return config
    }

    errorRequestInterceptor(error) {
        store.commit(HTTP_REQUEST_STOP)
        return Promise.reject(error)
    }

    okResponseInterceptor(response) {
        store.commit(HTTP_REQUEST_STOP)
        return response.data
    }

    errorResponseInterceptor(error) {
        store.commit(HTTP_REQUEST_STOP)

        let mappedError = null
        if (!error.response) {
            mappedError = {
                response: {
                    data: {
                        message: error.message
                    }
                }
            }
        } else {
            mappedError = error
        }

        return Promise.reject(mappedError)
    }

    get(url, params) {
        const wrappedParams = { params: params }
        return this.http.get(url, wrappedParams)
    }

    post(url, params, config) {
        return this.http.post(url, params, config)
    }
}
