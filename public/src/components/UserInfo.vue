<template>
    <div>
        <label>Fullname: {{ user.fullName }}</label>
        <label>Type: {{ user.type }}</label>
    </div>
</template>

<script>
export default {
    name: 'UserInfo',
    props: {
        user: {
            required: true,
            type: Object
        }
    }
}
</script>

<style scoped>

</style>
