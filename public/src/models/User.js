export default class User {
    constructor(user) {
        this.fullName = user.fullName
        this.type = user.type
    }

    getFullname() {
        return this.fullName
    }

    getType() {
        return this.type
    }
}
