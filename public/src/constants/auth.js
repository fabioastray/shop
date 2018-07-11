export const rules = {
    PASSWORD: {
        min: 3
    },
    EMAIL: {
        regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    }
}

export const authorization = {
    headerKey: 'authorization',
    localStorageKey: 'user-token'
}
