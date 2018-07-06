import SignupPage from '../components/SignupPage'
import LoginPage from '../components/LoginPage'
import HomePage from '../components/HomePage'
import AuthService from '../services/Auth'

https://blog.sqreen.io/authentication-best-practices-vue/

export default {
    list: [ // Add routes to this array
        {
            path: '*', // Unknown paths will be redirected to the login page
            redirect: {
                name: 'login'
            }
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupPage,
            title: 'Signup',
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
                if (!AuthService.isAuthenticated()) {
                    next('/login')
                }
            }
        }
    ],
    getByName(name) {
        const route = this.list.filter((route) => route.name === name)
        return route.length === 1 ? route[0] : null
    }
}
