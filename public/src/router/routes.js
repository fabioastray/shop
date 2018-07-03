import SignupPage from '../components/SignupPage'
import LoginPage from '../components/LoginPage'
import HomePage from '../components/HomePage'

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
