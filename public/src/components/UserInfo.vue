<template>
    <v-toolbar flat class="transparent">
        <v-list class="pa-0">
            <v-list-tile avatar>
                <v-list-tile-avatar>
                    <img :src="data.getAvatar()">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{ data.getFullname() }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-toolbar>
</template>

<script>
import UserInfo from '../models/User'

export default {
    props: {
        data: {
            required: true,
            type: UserInfo
        }
    }
}
</script>

<style scoped>

</style>
