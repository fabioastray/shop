export default class User {
    constructor(user) {
        this._id = user._id
        this.username = user.username
        this.fullName = user.fullName
        this.type = user.type
        this.avatar = {
            url: user.avatar.url,
            file: null
        }
        this.gender = user.gender
        this.telephone = user.telephone
    }
}
