<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-form v-model="valid">
                Sign up
                <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    label="E-mail"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password1"
                    :type="'password'"
                    :rules="passwordRules"
                    label="Password"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password2"
                    :type="'password'"
                    :rules="passwordRules"
                    label="Retype Password"
                    required
                ></v-text-field>
                <v-btn
                    type="password"
                    class="right"
                    color="primary"
                    :disabled="!valid"
                    @click="submit"
                >
                    submit
                </v-btn>
            </v-form>
        </v-layout>
    </v-container>
</template>

<script>
import AuthService from '../services/Auth'
import authRules from '../constants/authRules'

export default {
    name: 'SignupPage',
    data () {
        return {
            valid: false,
            username: '',
            usernameRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            password1: '',
            password2: '',
            passwordRules: [
                v => !!v || 'This field is required',
                v => v.length >= authRules.PASSWORD.minCharsAmount || `This field must be more than ${authRules.PASSWORD.minCharsAmount} characters`,
                v => this.password1 === this.password2 || 'Passwords must be the same'

            ]
        }
    },
    methods: {
        submit() {
            AuthService.signup(this.username, this.password1)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
