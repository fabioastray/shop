<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-form v-model="validForm" @submit.prevent="submit" enctype="multipart/form-data">
                <h3>My Profile</h3>
                <v-divider></v-divider>
                <v-text-field
                    prepend-icon="assignment_ind"
                    v-model="profile.fullName"
                    label="Full name"
                    required
                ></v-text-field>
                <v-text-field
                    prepend-icon="mail"
                    v-model="profile.username"
                    disabled
                    label="Username"
                    required
                ></v-text-field>
                <v-text-field
                    prepend-icon="phone"
                    mask="phone"
                    v-model="profile.telephone"
                    label="Telephone"
                    required
                ></v-text-field>
                <p>Gender</p>
                <v-radio-group v-model="profile.gender" :mandatory="false">
                    <v-radio label="Female" value="F"></v-radio>
                    <v-radio label="Male" value="M"></v-radio>
                </v-radio-group>
                <v-layout align-center>
                    <v-avatar size="80px" class="mb-3 ml-5"
                          @mouseenter="isHover = true"
                          @mouseleave="isHover = false">
                        <img :class="{ 'freeze': isHover }"
                             v-if="profile.avatar"
                             :src="profile.avatar.url"
                             alt="Avatar"
                             ref="profile-avatar"
                        >
                        <file-upload
                            v-show="isHover"
                            :accept="acceptedFileFormats"
                            :size="acceptedFileSize"
                            @change="onAvatarSelection"
                            @error="onAvatarSelectionError"
                        ></file-upload>
                    </v-avatar>
                </v-layout>
                <v-btn
                    type="submit"
                    class="right"
                    color="primary"
                    :disabled="!validForm"
                >
                    submit
                </v-btn>
                <v-btn
                    class="right"
                    @click="restoreProfile"
                >
                    cancel
                </v-btn>
            </v-form>
        </v-layout>
    </v-container>
</template>

<script>
import { USER_UPDATE_PROFILE, USER_REQUEST } from '../store/actions/user'
import FileUpload from './FileUpload'
import Utils from '../utils/utils'

export default {
    name: 'ProfilePage',
    components: { FileUpload },
    data () {
        return {
            validForm: false,
            profile: {},
            isHover: false,
            acceptedFileFormats: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
            acceptedFileSize: 1
        }
    },
    created() {
        if (!this.$store.getters.isProfileLoaded) {
            this.$store.dispatch(USER_REQUEST)
                .then(response => {
                    this.backupProfile(response)
                })
        } else {
            this.backupProfile(this.$store.getters.profile)
        }
    },
    methods: {
        backupProfile(profile) {
            this.backup = profile
            this.profile = Utils.copyObject(this.backup)
        },
        restoreProfile() {
            this.profile = Utils.copyObject(this.backup)
        },
        submit() {
            const profile = this.mapProfileToForm(this.profile)

            this.$store.dispatch(USER_UPDATE_PROFILE, profile)
                .then(resp => {
                    this.backupProfile(resp)

                    this.$notify({
                        group: 'foo',
                        title: 'Important message',
                        text: 'successfully updated profile'.capitalize(),
                        type: 'success'
                    })
                }, error => {
                    this.$notify({
                        group: 'foo',
                        title: 'Important message',
                        text: error.response.data.message.capitalize(),
                        type: 'error'
                    })
                })
        },
        onAvatarSelection(file) {
            const reader = new FileReader()

            reader.onload = (e) => {
                this.profile.avatar = {
                    url: e.target.result,
                    file: file
                }
            }

            reader.readAsDataURL(file)
        },
        onAvatarSelectionError(error) {
            this.$notify({
                group: 'foo',
                title: 'Important message',
                text: error.capitalize(),
                type: 'error'
            })
        },
        mapProfileToForm(profile) {
            if (profile.avatar.file) {
                const formData = new FormData()

                for (const property in profile) {
                    const field = profile[property]

                    if (property === 'avatar') {
                        formData.append(property, field.file, field.file.name)
                    } else {
                        formData.append(property, field)
                    }
                }

                return formData
            }

            return profile
        }
    }
}
</script>

<style scoped>

</style>
