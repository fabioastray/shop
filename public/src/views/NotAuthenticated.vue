<template>
    <v-app id="app">
        <div id="loader" v-show="isBusy">
            <v-progress-circular
                :size="100"
                color="primary"
                indeterminate
            ></v-progress-circular>
        </div>
        <v-content v-bind:class="{ 'freeze': isBusy }">
            <notifications group="foo" />
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'NotAuthenticated',
    computed: {
        ...mapGetters(['isBusy'])
    }
}
</script>

<style scoped>

</style>
