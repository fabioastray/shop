<template>
    <div class="fixed pb-5 cursor-pointer">
        <v-icon
            light
            size="40px"
            @click="openFileExplorer"
        >camera_alt</v-icon>
        <input type="file" @change="onChange" id="avatar-file" hidden>
    </div>
</template>

<script>
export default {
    name: 'FileUpload',
    props: {
        accept: {
            type: Array,
            required: true
        },
        size: {
            type: Number,
            required: true
        }
    },
    mounted() {
        const file = document.getElementById('avatar-file')
        if (!file) {
            console.error('No input file found with id:', 'avatar-file')
        } else {
            this.avatarInputFile = file
        }
    },
    methods: {
        openFileExplorer() {
            this.avatarInputFile.click()
        },
        onChange(event) {
            let file = null
            if (event.target.files && event.target.files.length) {
                file = event.target.files[0]
            }
            this.$emit('change', file)
        }
    }
}
</script>

<style scoped>

</style>
