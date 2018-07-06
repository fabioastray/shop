import Http from './Http'
import Utils from '../utils/utils'

export default {
    http: new Http(),

    login(username, password) {
        return this.http.post('/auth/login', { username, password })
    },

    register(user) {
        return this.http.post('/auth/register', user)
    }
}
