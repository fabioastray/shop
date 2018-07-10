import Http from './Http'

export default {
    http: new Http(),

    login(username, password) {
        return this.http.post('/auth/login', { username, password })
    },

    register(user) {
        return this.http.post('/auth/register', user)
    }
}
