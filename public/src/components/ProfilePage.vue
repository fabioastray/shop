<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-form v-model="validForm" @submit.prevent="submit">
                <h3>My Profile</h3>
                <v-divider></v-divider>
                <v-text-field
                    v-model="profile.username"
                    disabled
                    label="Username"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="profile.fullName"
                    label="Full name"
                    required
                ></v-text-field>
                <v-text-field
                    mask="phone"
                    v-model="profile.telephone"
                    label="Telephone"
                    required
                ></v-text-field>
                <p>Gender</p>
                <v-radio-group v-model="profile.gender" :mandatory="false">
                    <v-radio label="Feminine" value="F"></v-radio>
                    <v-radio label="Masculine" value="M"></v-radio>
                </v-radio-group>
                <v-text-field
                    v-model="profile.avatar"
                    label="Avatar"
                    required
                ></v-text-field>
                <v-btn
                    type="submit"
                    class="right"
                    color="primary"
                    :disabled="!validForm"
                >
                    submit
                </v-btn>
                <v-btn
                    class="right"
                    @click="restoreProfile"
                >
                    cancel
                </v-btn>
            </v-form>
        </v-layout>
    </v-container>
</template>

<script>
import { USER_UPDATE_PROFILE, USER_REQUEST } from '../store/actions/user'

export default {
    name: 'ProfilePage',
    data () {
        return {
            validForm: false,
            profile: {}
        }
    },
    created() {
        if (!this.$store.getters.isProfileLoaded) {
            this.$store.dispatch(USER_REQUEST)
                .then(response => {
                    this.backupProfile(response)
                })
        } else {
            this.backupProfile(this.$store.getters.profile)
        }
    },
    methods: {
        backupProfile(profile) {
            this.backup = profile
            this.profile = Object.assign({}, this.backup)
        },
        restoreProfile() {
            this.profile = Object.assign({}, this.backup)
        },
        submit() {
            this.$store.dispatch(USER_UPDATE_PROFILE, this.profile)
                .then(resp => {
                    this.backupProfile(resp)

                    this.$notify({
                        group: 'foo',
                        title: 'Important message',
                        text: 'successfully updated profile'.capitalize(),
                        type: 'success'
                    })
                }, error => {
                    this.$notify({
                        group: 'foo',
                        title: 'Important message',
                        text: error.response.data.message.capitalize(),
                        type: 'error'
                    })
                })
        }
    }
}
</script>

<style scoped>

</style>
