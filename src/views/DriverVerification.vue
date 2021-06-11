<template>
  <div>
    <v-container style="padding: 20px; margin-top: -20px" fluid
      ><br />
      <h3 style="font-weight: 400">Hi, Welcome Back!</h3>
      <span style="font-size: 13px"
        >Welcome to E-Tulod <router-link to="/dashboard">Admin Dashboard</router-link> / Driver Verification</span
      >
    </v-container>
    <v-container fluid>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Registered Riders
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
            show-expand
            :headers="headers"
            :items="allDriversToVerify"
            :search="search"
            item-key="id"
            aria-setsize="2px"
            class="elevation-1"
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
            <template v-slot:item.actions="{ item }">
              <v-menu transition="slide-x-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon small v-bind="attrs" v-on="on" class="mr-2">
                    mdi-dots-vertical
                  </v-icon>
                </template>
                <v-list>
                  <v-list-item @click="approveRider(item)">
                    <v-icon size="16">mdi-check</v-icon
                    ><v-list-item-title
                      style="font-size: 11px; margin-left: 5px"
                      >Approve Rider</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item @click="declineRider(item)">
                    <v-icon size="16">mdi-close</v-icon
                    ><v-list-item-title
                      style="font-size: 11px; margin-left: 5px"
                      >Decline Rider</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
            <template v-slot:expanded-item="{ item }">
              <td colspan="4">
                <v-container style="padding: 30px">
                  <v-row>
                    <v-col cols="6">
                      <span style="font-weight: bold">Driver License</span>
                      <v-img
                        @click="
                          showIdDialog(
                            item.driverLicense == null
                              ? 'https://i.stack.imgur.com/y9DpT.jpg'
                              : item.driverLicense
                          )
                        "
                        class="white--text align-end"
                        :src="
                          item.driverLicense == null
                            ? 'https://i.stack.imgur.com/y9DpT.jpg'
                            : item.driverLicense
                        "
                        lazy-src="https://img.philkotse.com/2020/11/12/KjJYY7r3/professional-1-752e.jpg"
                        style="margin: 20px; width: 260px; height: auto"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-container>
    <v-dialog
      v-model="dialogId"
      width="1000"
    >
      <v-btn
        @click="dialogId = false"
        icon
        color="white"
        style="position: absolute; top: 20px; right: 20px"
      >
        <v-icon size="23">mdi-close</v-icon>
      </v-btn>
      <v-img
        :src="currentIdUrlDialog"
        lazy-src="https://img.philkotse.com/2020/11/12/KjJYY7r3/professional-1-752e.jpg"
        style="width: 100%; height: auto"
      />
    </v-dialog>
  </div>
</template>

<script>
export default {};
</script>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Profile", value: "profileSlot", align: "start" },
      { text: "First Name", value: "fname", align: "start" },
      {
        text: "Middle Name",
        sortable: true,
        value: "mname",
      },
      { text: "Last Name", value: "lname", sortable: true },
      { text: "Email", value: "email", sortable: true },
      { text: "Address", value: "address", sortable: true },
      { text: "Action", value: "actions" },
      { text: "", value: "data-table-expand" },
    ],
    currentIdUrlDialog: "",
    dialogId: false
  }),
  methods: {
    setDriversToVerify() {
      firebase
        .firestore()
        .collection("drivers")
        .where("accepted", "==", false)
        .where("hasDriverLicense", "==", true)
        .where("declined", "==", false)
        .onSnapshot((querySnapshot) => {
          const driversArray = querySnapshot.docs.map((documentSnapshot) => {
            return {
              id: documentSnapshot.id,
              ...documentSnapshot.data(),
            };
          });

          console.log("Drivers", driversArray);
          this.$store.commit("SET_DRIVERS_TO_VERIFY", driversArray);
        });
    },
    approveRider(item) {
      var driverRef = firebase
        .firestore()
        .collection("drivers")
        .doc(item.id);

      // Set the "capital" field of the city 'DC'
      return driverRef
        .update({
          accepted: true,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    declineRider(item) {
      var driverRef = firebase
        .firestore()
        .collection("drivers")
        .doc(item.id);

      // Set the "capital" field of the city 'DC'
      return driverRef
        .update({
          declined: true,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    showIdDialog(url) {
      this.dialogId = true
      this.currentIdUrlDialog = url
    },
  },
  created() {
    this.setDriversToVerify();
  },
  computed: mapGetters(["allDriversToVerify"]),
};
</script>
