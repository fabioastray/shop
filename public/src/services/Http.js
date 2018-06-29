import Axios from 'axios'

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
        console.log('post')
        return this.http.post(url, params, config)
    }
}
