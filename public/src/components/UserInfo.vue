<template>
    <v-toolbar flat class="transparent">
        <v-list class="pa-0">
            <v-list-tile avatar>
                <v-list-tile-avatar>
                    <img :src="profile.getAvatar()">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{ profile.getFullname() }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                        <a href="#" @click="logout">Logout</a>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-toolbar>
</template>

<script>
import { mapState } from 'vuex'
import {AUTH_LOGOUT} from '../store/actions/auth'

export default {
    computed: mapState({ profile: state => state.user.profile }),
    methods: {
        logout() {
            this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
        }
    }
}
</script>

<style scoped>

</style>
