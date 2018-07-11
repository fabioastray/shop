<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-form v-model="validForm"  @submit.prevent="submit">
                Login
                <v-text-field
                    v-model="username.model"
                    :rules="username.rules"
                    :error="username.hasError"
                    :errorMessages="username.errors"
                    label="E-mail"
                    required
                ></v-text-field>
                <v-text-field
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
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
                <router-link to="register">Don't have an account yet? Click here</router-link>
            </v-form>
        </v-layout>
    </v-container>
</template>

<script>
import { rules } from '../constants/auth'
import { AUTH_LOGIN } from '../store/actions/auth'

export default {
    name: 'LoginPage',
    data () {
        return {
            validForm: false,
            username: {
                model: '',
                rules: [
                    v => !!v || 'E-mail is required',
                    v => rules.EMAIL.regex.test(v) || 'E-mail must be valid'
                ],
                hasError: false,
                errors: []
            },
            password: '',
            passwordRules: [
                v => !!v || 'This field is required',
                v => v.length >= rules.PASSWORD.min || `This field must be more than ${rules.PASSWORD.min} characters`
            ]
        }
    },
    methods: {
        submit() {
            this.resetErrors()

            const user = {
                username: this.username.model,
                password: this.password
            }

            this.$store.dispatch(AUTH_LOGIN, user)
                .then(resp => {
                    this.$router.replace({ name: 'home' })
                }, error => {
                    console.error(error)
                    this.username.hasError = true
                    this.username.errors.push(error.message.capitalize())
                })
        },
        resetErrors() {
            if (this.username.hasError) {
                this.username.hasError = false
                this.username.errors.length = 0
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
