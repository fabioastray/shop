export default class User {
    constructor(user) {
        this.fullName = user.fullName
        this.type = user.type
        this.avatar = user.avatar
    }

    getFullname() {
        return this.fullName
    }

    getType() {
        return this.type
    }

    getAvatar() {
        return this.avatar
    }
}
