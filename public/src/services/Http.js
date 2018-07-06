import Axios from 'axios'
import { AUTH_TOKEN_KEY } from "../store/actions/auth";

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

        const token = localStorage.getItem(AUTH_TOKEN_KEY)
        if (token) {
            this.http.defaults.headers.common['Authorization'] = token
        }
    }

    okResponseInterceptor(response) {
        return response.data
    }

    errorResponseInterceptor(error) {
        const log = error.response ? error.response.data : error.message
        return Promise.reject(log)
    }

    get(url, params) {
        const wrappedParams = { params: params }
        return this.http.get(url, wrappedParams)
    }

    post(url, params, config) {
        return this.http.post(url, params, config)
    }
}
