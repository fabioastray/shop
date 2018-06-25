<template>
    <v-app id="app">
        <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            v-model="drawer"
            fixed
            app
        >
            <v-list dense>
                <template v-for="item in items">
                    <v-layout
                        v-if="item.heading"
                        :key="item.heading"
                        row
                        align-center
                    >
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-flex>
                    </v-layout>
                    <v-list-group
                        v-else-if="item.children"
                        v-model="item.model"
                        :key="item.text"
                        :prepend-icon="item.model ? item.icon : item['icon-alt']"
                        append-icon=""
                    >
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile
                            v-for="(child, i) in item.children"
                            :key="i"
                            :to="{ path: item.path  }"
                        >
                            <v-list-tile-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="item.text">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
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
                { icon: 'contacts', text: 'Contacts', path: '' },
                { icon: 'history', text: 'Frequently contacted', path: '' },
                { icon: 'content_copy', text: 'Duplicates', path: '' },
                {
                    icon: 'keyboard_arrow_up',
                    'icon-alt': 'keyboard_arrow_down',
                    text: 'Labels',
                    model: true,
                    children: [
                        { icon: 'add', text: 'Create label', path: '' }
                    ],
                    path: ''
                },
                {
                    icon: 'keyboard_arrow_up',
                    'icon-alt': 'keyboard_arrow_down',
                    text: 'More',
                    model: false,
                    children: [
                        { text: 'Import', path: '' },
                        { text: 'Export', path: '' },
                        { text: 'Print', path: '' },
                        { text: 'Undo changes', path: '' },
                        { text: 'Other contacts', path: '' }
                    ],
                    path: ''
                },
                { icon: 'settings', text: 'Settings', path: '' },
                { icon: 'chat_bubble', text: 'Send feedback', path: '' },
                { icon: 'help', text: 'Help', path: '' },
                { icon: 'phonelink', text: 'App downloads', path: '' },
                { icon: 'keyboard', text: 'Go to the old version', path: '' }
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
