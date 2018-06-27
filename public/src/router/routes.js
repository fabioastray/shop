import HomePage from '../components/HomePage'

export default {
    list: [ // Add routes to this array
        { path: '*', redirect: '/' },
        {
            path: '/',
            name: 'home',
            component: HomePage,
            title: 'Home',
            icon: 'home',
            beforeEnter: (to, from, next) => {
                console.info('checking auth')
                next()
            }
        }
    ],
    getByName(name) {
        const route = this.list.filter((route) => route.name === name)
        return route.length === 1 ? route[0] : null
    }
}
