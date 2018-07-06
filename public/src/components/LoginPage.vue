<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-form v-model="valid">
                Login
                <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    label="E-mail"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                ></v-text-field>
                <v-btn
                    class="right"
                    color="primary"
                    :disabled="!valid"
                    @click="submit"
                >
                    submit
                </v-btn>
                <router-link to="register">Don't have an account yet? Click to create a new one</router-link>
            </v-form>
        </v-layout>
    </v-container>
</template>

<script>
import Auth from '../services/Auth'

export default {
    name: 'LoginPage',
    data () {
        return {
            valid: false,
            username: '',
            usernameRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            password: '',
            passwordRules: [
                v => !!v || 'This field is required',
                v => v.length >= 7 || 'This field must be more than 7 characters'
            ]
        }
    },
    methods: {
        submit() {
            Auth.login(this.username, this.password)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
