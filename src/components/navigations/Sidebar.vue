<template>
    <v-navigation-drawer
        app
        light
    >
        <template v-slot:prepend>
            <v-list-item two-line size="9">
            <v-list-item-avatar>
                <img :src="typeof $store.state.session.profile === '' ? 'https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png' : $store.state.session.profile">
            </v-list-item-avatar>
            <span style="height: 15px; width: 15px; border: 3px solid white; border-radius: 50%; background-color: #22bf66; position: absolute; top: 43px; left: 43px;"></span>
            <v-list-item-content>   
                <v-list-item-title class="title"></v-list-item-title>
                <v-list-item-subtitle style="font-size: 13px; font-weight: bold; color: black">{{ $store.state.session.firstName }} {{ $store.state.session.lastName }}</v-list-item-subtitle>
                <v-list-item-subtitle style="font-size: 11px">{{ $store.state.session.email }}</v-list-item-subtitle>
                <v-list-item-subtitle style="font-size: 11px">{{ $store.state.admin }}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
        </template>
        <v-divider></v-divider>
        <v-list dense class="highlighted overflow-hidden">
             <!-- LIST OF NAVIGATION -->
            <v-subheader>NAVIGATION</v-subheader>
            <v-list-item-group color="primary">
                <v-list-item to="/dashboard">
                    <v-list-item-icon>
                        <v-icon>mdi-view-dashboard-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            <v-subheader>USER MANAGEMENT</v-subheader>
            <v-list-item-group color="primary">
                <v-list-item to="/admin-registration">
                    <v-list-item-icon>
                        <v-icon>mdi-account-plus-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Admin Registration</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/driver-registration">
                    <v-list-item-icon>
                        <v-icon>mdi-moped-electric-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Driver Registration</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/driver-verification">
                    <v-list-item-icon>
                        <v-icon>mdi-card-account-details-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Driver Verification</v-list-item-title>
                    </v-list-item-content>
                    <v-chip draggable color="red" small text-color="white" v-if="$store.getters.allDriversToVerify.length > 0">{{ $store.getters.allDriversToVerify.length }}</v-chip>
                </v-list-item>
            </v-list-item-group>
             <v-subheader>OTHERS</v-subheader>
            <v-list-item-group color="primary">
                <v-list-item to="/remit-rider">
                    <v-list-item-icon>
                        <v-icon>mdi-cash-usd-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Remit Rider</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                 <v-list-item to="/remits">
                    <v-list-item-icon>
                        <v-icon>mdi-format-list-checkbox</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>All Remits</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
/* import firebase from 'firebase/app'
import 'firebase/auth' */
export default {
    data: () => ({
    }),
}
</script>

<style>

</style>