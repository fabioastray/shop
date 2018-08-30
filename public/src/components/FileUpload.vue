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
        const id = 'avatar-file'
        const file = document.getElementById(id)
        if (!file) {
            console.error('No input file found with id:', id)
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
            if (event.target.files) {
                if (event.target.files.length > 1) {
                    event.target.value = null
                    return this.$emit('error', 'only one file is allowed')
                } else {
                    file = event.target.files[0]
                    const fileSizeInMb = Math.round(file.size / 1024)// To Mb
                    const allowedSizeInMb = Math.round(this.size * 1024) // To Mb

                    if (fileSizeInMb > allowedSizeInMb) {
                        event.target.value = null
                        return this.$emit('error', `file size is not allowed, max is: ${allowedSizeInMb} Mb`)
                    }
                }
            }
            this.$emit('change', file)
        }
    }
}
</script>

<style scoped>

</style>
