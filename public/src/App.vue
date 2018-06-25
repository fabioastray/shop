<template>
    <v-app id="app">
        <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            v-model="drawer"
            fixed
            app
        >
            <v-list>
                <v-list-group
                    v-for="item in items"
                    v-model="item.active"
                    :key="item.title"
                    :prepend-icon="item.action"
                    no-action
                >
                    <v-list-tile slot="activator">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>{{ subItem.action }}</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            color="blue darken-3"
            dark
            app
            fixed>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down"><router-link :to="{ name: 'HomePage' }">My Shop</router-link></span>
            </v-toolbar-title>
            <v-text-field
                flat
                solo-inverted
                prepend-icon="search"
                label="Search"
                class="hidden-sm-and-down"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>notifications</v-icon>
            </v-btn>
            <v-btn icon large>
                <v-avatar size="32px" tile>
                    <img
                        src="https://vuetifyjs.com/static/doc-images/logo.svg"
                        alt="Vuetify"
                    >
                </v-avatar>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    Content
                </v-layout>
            </v-container>
        </v-content>
        <v-btn
            fab
            bottom
            right
            color="pink"
            dark
            fixed
            @click.stop="dialog = !dialog"
        >
            <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="800px">
            <v-card>
                <v-card-title
                    class="grey lighten-4 py-4 title"
                >
                    Create contact
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs12 align-center justify-space-between>
                            <v-layout align-center>
                                <v-avatar size="40px" class="mr-3">
                                    <img
                                        src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                                        alt=""
                                    >
                                </v-avatar>
                                <v-text-field
                                    placeholder="Name"
                                ></v-text-field>
                            </v-layout>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                prepend-icon="business"
                                placeholder="Company"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                placeholder="Job title"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                prepend-icon="mail"
                                placeholder="Email"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                type="tel"
                                prepend-icon="phone"
                                placeholder="(000) 000 - 0000"
                                mask="phone"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                prepend-icon="notes"
                                placeholder="Notes"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-btn flat color="primary">More</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
                    <v-btn flat @click="dialog = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
import UserService from './services/User'
import UserInfo from './components/UserInfo'
import routes from './router/routes'

export default {
    data() {
        return {
            user: null,
            routes,
            dialog: false,
            drawer: null,
            items: [
                {
                    action: 'local_activity',
                    title: 'Attractions',
                    items: [
                        {title: 'List Item'}
                    ]
                },
                {
                    action: 'restaurant',
                    title: 'Dining',
                    active: true,
                    items: [
                        {title: 'Breakfast & brunch'},
                        {title: 'New American'},
                        {title: 'Sushi'}
                    ]
                },
                {
                    action: 'school',
                    title: 'Education',
                    items: [
                        {title: 'List Item'}
                    ]
                },
                {
                    action: 'directions_run',
                    title: 'Family',
                    items: [
                        {title: 'List Item'}
                    ]
                },
                {
                    action: 'healing',
                    title: 'Health',
                    items: [
                        {title: 'List Item'}
                    ]
                },
                {
                    action: 'content_cut',
                    title: 'Office',
                    items: [
                        {title: 'List Item'}
                    ]
                },
                {
                    action: 'local_offer',
                    title: 'Promotions',
                    items: [
                        {title: 'List Item'}
                    ]
                }
            ]
        }
    },
    name: 'App',
    created() {
        const userService = new UserService()
        userService.fetch(1).then(user => { this.user = user })
    },
    components: {
        UserInfo
    }
}
</script>

<style>
    a.router-link-active {
        color: #fff;
        text-decoration: none;
    }
</style>
