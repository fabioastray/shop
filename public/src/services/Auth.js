import Http from './Http'
import Utils from '../utils/utils'

export default {
    http: new Http(),

    login(username, password) {
        return this.http.post('/auth/login', { username, password })
    },

    signup(username, password) {
        return this.http.post('/auth/signup', { username, password })
    },

    isAuthenticated() {
        return Utils.getCookie('user').length > 0
    }
}
