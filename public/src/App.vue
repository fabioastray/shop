<template>
    <div id="app">
        <header>
            <user-info :user="user"></user-info>
        </header>
        <main>
            <router-view/>
        </main>
        <footer>A footer</footer>
    </div>
</template>

<script>
import UserService from './services/User'
import UserInfo from './components/UserInfo'

export default {
    data() {
        return {
            user: null
        }
    },
    name: 'App',
    created() {
        const userService = new UserService()
        userService.fetch(1).then(user => { this.user = user })
    },
    components: {
        UserInfo
    }
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    header {
        height: 100px;
        background-color: #42b983;
        top: 0;
    }

    main {
        height: 100%;
    }

    footer {
        height: 100px;
        background-color: #42b983;
        bottom: 0;
    }
</style>
