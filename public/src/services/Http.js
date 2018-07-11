import Axios from 'axios'
import { authorization } from '../constants/auth'

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

        const token = localStorage.getItem(authorization.localStorageKey)
        if (token) {
            this.http.defaults.headers.common[authorization.headerKey] = token
        }
    }

    okResponseInterceptor(response) {
        return response.data
    }

    errorResponseInterceptor(error) {
        return Promise.reject(error)
    }

    get(url, params) {
        const wrappedParams = { params: params }
        return this.http.get(url, wrappedParams)
    }

    post(url, params, config) {
        return this.http.post(url, params, config)
    }
}
