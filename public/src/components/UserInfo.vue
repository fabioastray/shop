<template>
    <div>
        <label>Fullname: {{ user.fullName }}</label>
        <hr>
        <label>Type: {{ user.type }}</label>
    </div>
</template>

<script>
import UserInfo from '../components/UserInfo'

export default {
    name: 'UserInfo',
    props: {
        user: {
            required: true,
            type: UserInfo
        }
    }
}
</script>

<style scoped>

</style>
