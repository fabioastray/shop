<template>
    <v-app id="app">
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    <v-form v-model="valid">
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
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
                    </v-form>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import UserService from '../services/User'

    export default {
        name: 'LoginPage',
        data () {
            return {
                valid: false,
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                password: '',
                passwordRules: [
                    v => !!v || 'This field is required',
                    v => v.length >= 7 || 'This field must be more than 7 characters'
                ],
            }
        },
        methods: {
            submit() {
                const userService = new UserService()
                userService.login(this.email, this.password)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
