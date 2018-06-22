import Http from './Http'
import User from '../models/User'

export default class UserService {
    constructor() {
        this.http = new Http()
    }

    fetch(id) {
        return Promise.resolve(
            new User({
                fullName: 'Fabio Campos',
                type: 'user'
            })
        )
    // return this.http.get(`/users/${id}`);
    }
}
