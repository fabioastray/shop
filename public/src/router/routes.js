import RegisterPage from '../components/RegisterPage'
import LoginPage from '../components/LoginPage'
import HomePage from '../components/HomePage'
import ForgotPasswordPage from '../components/ForgotPasswordPage'
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
            icon: 'lock',
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/forgotPassword',
            name: 'forgotPassword',
            component: ForgotPasswordPage,
            title: 'Forgot Password',
            icon: 'lock',
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/home',
            name: 'home',
            component: HomePage,
            title: 'Home',
            icon: 'home',
            beforeEnter: ifAuthenticated
        }
    ],
    getByName(name) {
        const route = this.list.filter((route) => route.name === name)
        return route.length === 1 ? route[0] : null
    }
}
