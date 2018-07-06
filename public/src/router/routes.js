import RegisterPage from '../components/RegisterPage'
import LoginPage from '../components/LoginPage'
import HomePage from '../components/HomePage'
import store from '../store'

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/home')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/login')
}

export default {
    list: [ // Add routes to this array
        {
            path: '*', // Unknown paths will be redirected to the login page
            redirect: {
                name: 'login'
            }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterPage,
            title: 'Register',
            icon: 'lock'
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
            title: 'Login',
            icon: 'lock'
        },
        {
            path: '/home',
            name: 'home',
            component: HomePage,
            title: 'Home',
            icon: 'home',
            beforeEnter: (to, from, next) => {

            }
        }
    ],
    getByName(name) {
        const route = this.list.filter((route) => route.name === name)
        return route.length === 1 ? route[0] : null
    }
}
