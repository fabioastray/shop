<template>
    <v-app id="app">
        <v-form v-model="valid">
            <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="10"
                label="Name"
                required
            ></v-text-field>
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>
        </v-form>
    </v-app>
</template>

<script>
export default {
    name: 'SignupPage',
    data () {
        return {
            valid: false,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
