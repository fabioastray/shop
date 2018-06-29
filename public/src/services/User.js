import Http from './Http'
import User from '../models/User'

export default class UserService {
    constructor() {
        this.http = new Http()
    }

    login(username, password) {
        return this.http.post('/login', { username, password })
    }

    fetch(id) {
        return this.http.get(`/users/${id}`).then((data) => new User(data))
    }
}
