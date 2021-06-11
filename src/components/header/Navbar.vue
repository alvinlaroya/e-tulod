<template>
  <nav>
    <!-- #004660 -->
    <v-app-bar app color="white" dark height="72">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://www.makatoda.com/assets/images/makatoda300.jpg"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#000000"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item>
                <v-list-item-icon>
                        <v-icon>mdi-account-outline</v-icon>
                    </v-list-item-icon>
                <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="signOut()">
                <v-list-item-icon>
                        <v-icon>mdi-logout-variant</v-icon>
                    </v-list-item-icon>
                <v-list-item-title>Sign out {{ $store.state.session.firstName }}</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
    </v-app-bar>
  </nav>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'
export default {
  data: () => ({

  }),
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        localStorage.removeItem('currentUser')
        this.$router.replace({name: 'Home'});
      }).catch((error) => {
        console.log(error)
      });
    }
  }
}
</script>

<style>

</style>