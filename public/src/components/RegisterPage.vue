<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-form v-model="validForm" @submit.prevent="submit">
                Register
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
                    type="submit"
                    class="right"
                    color="primary"
                    :disabled="!validForm"
                >
                    submit
                </v-btn>
            </v-form>
        </v-layout>
    </v-container>
</template>

<script>
import { rules } from '../constants/auth'
import { AUTH_REGISTER } from '../store/actions/auth'

export default {
    name: 'RegisterPage',
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
            password1: '',
            password2: '',
            passwordRules: [
                v => !!v || 'This field is required',
                v => v.length >= rules.PASSWORD.min || `This field must be more than ${rules.PASSWORD.min} characters`,
                v => this.password1 === this.password2 || 'Passwords must be the same'
            ]
        }
    },
    methods: {
        submit() {
            this.resetErrors()

            const user = {
                username: this.username.model,
                password: this.password1
            }

            this.$store.dispatch(AUTH_REGISTER, user)
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
