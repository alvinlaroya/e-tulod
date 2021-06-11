<template>
  <div>
    <v-container style="padding: 20px; margin-top: -20px" fluid
      ><br />
      <h3 style="font-weight: 400">Hi, Welcome Back!</h3>
      <span style="font-size: 13px"
        >Welcome to E-Tulod
        <router-link to="/dashboard">Admin Dashboard</router-link> / Remit
        Rider</span
      >
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              All Remit
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
              :items="allRemitsToday"
              :search="search"
              item-key="id"
              aria-setsize="2px"
              class="elevation-1"
              dense
            >
              <template v-slot:item.remitFeeSlot="{ item }">
                &#8369;{{ item.remitFee }}
              </template>
              <template v-slot:item.remittedAtSlot="{ item }">
                {{ item.remittedAt.toDate() | moment("MMMM DD YYYY, h:mm:ss a") }}
              </template>
              <template v-slot:item.etulodPercentageSlot="{ item }">
                &#8369;{{ item.etulodPercentage }}
              </template>
              <template v-slot:item.driverComissionSlot="{ item }">
                &#8369;{{ item.driverCommission }}
              </template>
              <template v-slot:item.isPaidSlot="{ item }">
                <v-chip
                    class="ma-2"
                    :color="item.isPaid ? '#067527' : '#d67124'"
                >
                    <span class="white--text">{{ item.isPaid ? "Paid" : "Not yet paid" }}</span>
                </v-chip>
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
      { text: "Remit by", value: "driverName", align: "start" },
      { text: "Remit Fee", value: "remitFeeSlot" },
      {
        text: "Remitted at",
        sortable: true,
        value: "remittedAtSlot",
      },
      { text: "e-tulod percentage", value: "etulodPercentageSlot", sortable: true },
      { text: "Driver Comission", value: "driverComissionSlot", sortable: true },
      { text: "No. of trips", value: "tripCtr", sortable: true },
      { text: "Status", value: "isPaidSlot", sortable: true },
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
    fetchRemitTdoay() {
      firebase
        .firestore()
        .collection("remits")
        /* .where("remittedAt", ">=", this.timeFormat(" 00:00:00"))
        .where("remittedAt", "<=", this.timeFormat(" 23:59:59")) */
        .onSnapshot((querySnapshot) => {
          const remitsTodayArray = querySnapshot.docs.map(
            (documentSnapshot) => {
              return {
                id: documentSnapshot.id,
                ...documentSnapshot.data(),
              };
            }
          );
          console.log(remitsTodayArray);
          this.$store.commit("SET_REMITS_TODAY", remitsTodayArray);
        });
    },
    markAsPaid(item) {
      firebase
      .firestore()
      .collection("remits")
      .doc(item.id)
      .update({
        isPaid: true
      })
    }
  },
  mounted() {
    this.fetchRemitTdoay();
  },
  computed: mapGetters(["allRemitsToday"]),
};
</script>

<style></style>
