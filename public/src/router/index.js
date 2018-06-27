import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
    routes: routes.list
})

router.onError = function(error) {
    console.error('An error was found', error)
}

export default router
