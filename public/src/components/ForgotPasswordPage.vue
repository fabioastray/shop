<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-form v-model="validForm" @submit.prevent="submit" v-if="getCurrentStep === 1">
                Forgot Password | Step {{ getCurrentStep }}: Send reset code by email
                <v-text-field
                    v-model="email.model"
                    :rules="email.rules"
                    :error="email.hasError"
                    :errorMessages="email.errors"
                    label="E-mail"
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
            <v-form v-model="validForm" @submit.prevent="submit" v-if="getCurrentStep === 2">
                Forgot Password | Step {{ getCurrentStep }}: Verify reset code
                <v-text-field
                    v-model="resetKey.model"
                    :rules="resetKey.rules"
                    label="Reset Code"
                    required
                    :error="resetKey.hasError"
                    :errorMessages="resetKey.errors"
                ></v-text-field>
                <v-text-field
                    v-model="password1"
                    :type="'password'"
                    :rules="passwordRules"
                    label="New Password"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password2"
                    :type="'password'"
                    :rules="passwordRules"
                    label="Retype New Password"
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
import { mapGetters } from 'vuex'
import { rules } from '../constants/auth'
import { PASSWORD_SEND_KEY, PASSWORD_RESET, RESET_INIT } from '../store/actions/resetAccount'

export default {
    name: 'LoginPage',
    data () {
        return {
            validForm: false,
            email: {
                model: '',
                rules: [
                    v => !!v || 'E-mail is required',
                    v => rules.EMAIL.regex.test(v) || 'E-mail must be valid'
                ],
                hasError: false,
                errors: []
            },
            resetKey: {
                model: '',
                rules: [
                    v => !!v || 'This field is required',
                    v => v.length >= rules.RESET_KEY.min || `This field must be more than ${rules.RESET_KEY.min} characters`
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
            let data = {}
            let dispatch = ''
            let elementShowingError = ''

            switch (this.getCurrentStep) {
            case 1:
                data.email = this.email.model
                dispatch = PASSWORD_SEND_KEY
                elementShowingError = 'email'
                break
            case 2:
                data.resetKey = this.resetKey.model
                data.newPassword = this.password1
                dispatch = PASSWORD_RESET
                elementShowingError = 'resetKey'
                break
            }

            this.$store.dispatch(dispatch, data)
                .then(resp => {
                    if (this.resetCompleted) {
                        this.$store.commit(RESET_INIT)
                        this.$router.replace({ name: 'login' })
                    }
                }, error => {
                    error = error.response.data
                    this.resetErrors(elementShowingError)
                    console.error(error)
                    this[elementShowingError].hasError = true
                    this[elementShowingError].errors.push(error.message.capitalize())
                })
        },
        resetErrors(element) {
            if (this[element].hasError) {
                this[element].hasError = false
                this[element].errors.length = 0
            }
        }
    },
    computed: {
        ...mapGetters(['getCurrentStep', 'resetCompleted'])
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
