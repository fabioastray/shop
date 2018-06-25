<template>
    <div id="app">
        <v-app>
            <v-navigation-drawer app>
                <v-list>
                    <v-list-tile v-for="(route, i) in routes" :key="i" :to="{ path: route.path } ">
                        <v-list-tile-action>
                            <v-icon>{{ route.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ route.friendlyName }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar app>
                <user-info :user="user"></user-info>
            </v-toolbar>
            <v-content>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </v-content>
            <v-footer app></v-footer>
        </v-app>
    </div>
</template>

<script>
import UserService from './services/User'
import UserInfo from './components/UserInfo'
import routes from './router/routes'

export default {
    data() {
        return {
            user: null,
            routes
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
