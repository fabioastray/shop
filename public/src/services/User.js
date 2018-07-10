import Http from './Http'
import User from '../models/User'

export default class UserService {
    constructor() {
        this.http = new Http()
    }

    me() {
        return this.http.get('/users/me').then((data) => new User(data))
    }
}
