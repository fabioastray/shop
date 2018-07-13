import Http from './Http'

export default {
    http: new Http(),

    login(user) {
        return this.http.post('/auth/login', user)
    },

    register(user) {
        return this.http.post('/auth/register', user)
    },

    resetPasswordSendKey(email) {
        return this.http.post('/auth/forgot/password', email)
    },

    resetPassword(credentials) {
        return this.http.post('/auth/reset/password', credentials)
    }
}
