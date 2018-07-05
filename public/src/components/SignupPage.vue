<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-form v-model="validForm">
                Sign up
                <v-text-field
                    v-model="username.model"
                    :rules="username.rules"
                    :error="username.hasError"
                    :errorMessages="username.errors"
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
                    :disabled="!validForm"
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
            validForm: false,
            username: {
                model: '',
                rules: [
                    v => !!v || 'E-mail is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                hasError: false,
                errors: []
            },
            password1: '',
            password2: '',
            passwordRules: [
                v => !!v || 'This field is required',
                v => v.length >= authRules.PASSWORD.min || `This field must be more than ${authRules.PASSWORD.min} characters`,
                v => this.password1 === this.password2 || 'Passwords must be the same'
            ]
        }
    },
    methods: {
        submit() {
            AuthService.signup(this.username.model, this.password1).then(resp => {
                console.log(resp)
            }, err => {
                console.error(err)
                this.username.hasError = true
                this.username.errors.push(err.capitalize())
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
