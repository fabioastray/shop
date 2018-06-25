<template>
    <div>
        <label>Fullname: {{ user ? user.fullName : '' }}</label>
        <label>Type: {{ user ? user.type : '' }}</label>
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
