<template>
  <div>
    <v-container style="padding: 20px; margin-top: -20px" fluid
      ><br />
      <h3 style="font-weight: 400">Hi, Welcome Back!</h3>
      <span style="font-size: 13px"
        >Welcome to E-Tulod
        <router-link to="/dashboard">Admin Dashboard</router-link> / Rider Management</span
      >
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              Rider Management
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                style="width: 20px"
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="allDrivers"
              :search="search"
              item-key="id"
              aria-setsize="2px"
              class="elevation-1"
              dense
            >
                <template v-slot:item.profileSlot="{ item }">
                    <v-img
                        class="white--text align-end"
                        height="50px"
                        width="50"
                        :src="
                        typeof item.profile === undefined
                            ? 'https://www.bkgymswim.com.au/wp-content/uploads/2017/08/image_large.png'
                            : item.profile
                        "
                        lazy-src="https://cdn2.iconfinder.com/data/icons/occupations-color-1/150/07-512.png"
                        style="border-radius: 50%; margin: 20px"
                    >
                        <template v-slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                            ></v-progress-circular>
                        </v-row>
                        </template>
                    </v-img>
              </template>
              <template v-slot:item.driverName="{ item }">
                {{ item.fname }} {{ item.lname }}
              </template>
              <template v-slot:item.statusSlot="{ item }">
                <v-chip
                    class="ma-2"
                    :text-color="item.disabled ? 'black' : 'white'"
                    :color="item.disabled ? 'gray' : 'green'"
                >
                    {{ item.disabled ? "Disabled" : "Enabled"}}
                </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-menu transition="slide-x-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon small v-bind="attrs" v-on="on" class="mr-2">
                      mdi-dots-vertical
                    </v-icon>
                  </template>
                  <v-list>
                    <v-list-item @click="markAsPaid(item)">
                      <v-icon size="16">mdi-check</v-icon
                      ><v-list-item-title
                        style="font-size: 11px; margin-left: 5px"
                        >{{ item.disabled ? "Enable" : "Disable" }} {{ item.fname }}</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Profile", value: "profileSlot", align: "start" },
      { text: "Name", value: "driverName" },
      { text: "Email", value: "email" },
      {
        text: "Address",
        sortable: true,
        value: "address",
      },
      { text: "Contact", value: "contact", sortable: true },
      { text: "Status", value: "statusSlot", sortable: true },
      { text: "Action", value: "actions" },
    ],
    currentIdUrlDialog: "",
    dialogId: false,
  }),
  methods: {
    timeFormat(hms) {
      var d = new Date();
      var date = d.getDate();
      var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
      var year = d.getFullYear();
      return firebase.firestore.Timestamp.fromDate(
        new Date(`${year}-${month}-${date}${hms}`)
      );
    },
    fetchRiders() {
      firebase
        .firestore()
        .collection("drivers")
        /* .where("remittedAt", ">=", this.timeFormat(" 00:00:00"))
        .where("remittedAt", "<=", this.timeFormat(" 23:59:59")) */
        .onSnapshot((querySnapshot) => {
          const riders = querySnapshot.docs.map(
            (documentSnapshot) => {
              return {
                id: documentSnapshot.id,
                ...documentSnapshot.data(),
              };
            }
          );
          console.log(riders);
          this.$store.commit("SET_RIDERS", riders);
        });
    },
    markAsPaid(item) {
      firebase
      .firestore()
      .collection("drivers")
      .doc(item.id)
      .update({
        disabled: !item.disabled
      })
    }
  },
  mounted() {
    this.fetchRiders();
  },
  computed: mapGetters(["allDrivers"]),
};
</script>

