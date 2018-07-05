Object.assign(String.prototype, {
    capitalize() {
        return this.length ? this.charAt(0).toUpperCase() + this.substr(1) : ''
    }
})
