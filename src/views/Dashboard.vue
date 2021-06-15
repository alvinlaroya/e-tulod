<template>
  <div class="dashboard">
    <v-container style="padding: 20px; margin-top: -20px" fluid
      ><br />
      <h3 style="font-weight: 400">Hi, Welcome Back!</h3>
      <span style="font-size: 13px">Welcome to E-Tulod Admin Dashboard</span>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-card class="text-left" style="height: 138px;">
            <span
              style="
                    font-size: 30px;
                    position: absolute;
                    top: 20px;
                    right: 15px;
                  "
              >10</span
            >
            <span
              style="
                    font-size: 20px;
                    color: grey;
                    position: absolute;
                    top: 20px;
                    left: 15px;
                  "
              >Bookings</span
            >
            <v-card-text style="position: absolute; bottom: 2px"
              >{{ allBookings.length }}<br />All</v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card class="text-left" style="height: 138px;">
            <span
              style="
                    font-size: 30px;
                    position: absolute;
                    top: 20px;
                    right: 15px;
                  "
              >{{ allOnlineRiders.length }}</span
            >
            <span
              style="
                    font-size: 20px;
                    color: grey;
                    position: absolute;
                    top: 20px;
                    left: 15px;
                  "
              >Online Riders</span
            >
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card class="text-left" style="height: 138px;">
            <span
              style="
                    font-size: 30px;
                    position: absolute;
                    top: 20px;
                    right: 15px;
                  "
              >&#8369;0</span
            >
            <span
              style="
                    font-size: 20px;
                    color: grey;
                    position: absolute;
                    top: 20px;
                    left: 15px;
                  "
              >Remit</span
            >
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card class="text-left" style="height: 138px;">
            <span
              style="
                    font-size: 30px;
                    position: absolute;
                    top: 20px;
                    right: 15px;
                  "
              >&#8369;0</span
            >
            <span
              style="
                    font-size: 20px;
                    color: grey;
                    position: absolute;
                    top: 20px;
                    left: 15px;
                  "
              >Revenue</span
            >
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="9">
          <v-card>
            <v-card-title>
              Bookings
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
              :items="allBookings"
              :search="search"
              item-key="id"
              aria-setsize="2px"
              class="elevation-1"
              dense
            >
              <template v-slot:item.riderSlot="{ item }">
                {{ item.driverName !== "" ? item.driverName : "No driver yet" }}
              </template>
              <template v-slot:item.locationSlot="{ item }">
                {{ `[${item.origin.latitude}, ${item.origin.longitude}]` }}
              </template>
              <template v-slot:item.destinationSlot="{ item }">
                {{
                  `[${item.destination.latitude}, ${item.destination.longitude}]`
                }}
              </template>
              <template v-slot:item.distanceSLot="{ item }">
                {{item.distance}}km
              </template>
              <template v-slot:item.fareSlot="{ item }">
                &#8369;{{ item.fare }}
              </template>
              <template v-slot:item.bookedAtSlot="{ item }">
                {{
                  item.createdAt.toDate() | moment("MMMM DD YYYY, h:mm:ss a")
                }}
              </template>
              <template v-slot:item.statusSlot="{ item }">
                {{
                  item.status === 1
                    ? "Pending"
                    : item.status === 2
                    ? "Dispatched"
                    : item.status === 3
                    ? "On The Way"
                    : item.status === 4
                    ? "Arrived Location"
                    : "Ariived Destination"
                }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-menu transition="slide-x-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon small v-bind="attrs" v-on="on" class="mr-2">
                      mdi-dots-vertical
                    </v-icon>
                  </template>
                  <v-list>
                    <v-list-item @click="dispatchRider(item)">
                      <v-icon size="16">mdi-check</v-icon
                      ><v-list-item-title
                        style="font-size: 11px; margin-left: 5px"
                        >Dispatch To Rider</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item @click="rejectBook(item)">
                      <v-icon size="16">mdi-close</v-icon
                      ><v-list-item-title
                        style="font-size: 11px; margin-left: 5px"
                        >Reject Booking</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card max-width="450" class="mx-auto">
            <v-toolbar color="cyan" dark>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>Riders</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-toolbar>

            <v-list two-line>
              <template v-for="(item, index) in allOnlineRiders">
                <v-divider
                  v-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                ></v-divider>

                <v-list-item :key="item.id">
                  <v-list-item-avatar>
                    <v-img :src="item.profile"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      `${item.fname} ${item.lname}`
                    }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{
                        item.status === 0
                          ? "Offline"
                          : item.status === 1
                          ? "Available"
                          : item.status === 2
                          ? "On Pickup Passenger / OTW"
                          : item.status === 3
                          ? "Picked up Passenger"
                          : "Arrived at Destination"
                      }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog
      v-model="dispatchingDialog"
      persistent
      max-width="320"
    >
      <v-card>
        <v-card-title style="font-size: 18px">
          Dispatching To Rider {{ currentlyDriverToDispatch }}
        </v-card-title>
        <v-container>
          <v-row>
            <v-col>
              <h1 style="text-align: center; font-size: 40px">
                {{ countdown / 10 > 0 ? countdown / 10 : "" }}
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
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
    dispatchingDialog: false,
    headers: [
      { text: "Booked by", value: "passengerName", align: "start" },
      { text: "Rider", value: "riderSlot" },
      {
        text: "Location",
        sortable: true,
        value: "locationSlot",
      },
      { text: "Destination", value: "destinationSlot", sortable: true },
      { text: "Distance", value: "distanceSLot", sortable: true },
      { text: "Fare", value: "fareSlot", sortable: true },
      { text: "Booked at", value: "bookedAtSlot", sortable: true },
      { text: "Status", value: "statusSlot", sortable: true },
      { text: "Action", value: "actions" },
    ],
    currentIdUrlDialog: "",
    dialogId: false,
    items: [{ header: "Today" }],
    currentlyDriverToDispatch: "",
    countdown: 100,
    dispatchIndex: 0,
    bookiDispatchDocId: "",
  }),
  methods: {
    fetchBookings() {
      firebase
        .firestore()
        .collection("bookings")
        .where("isDispatch", "==", false)
        .where("hasRider", "==", false)
        .where("status", "==", 1)
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          const bookingsArray = querySnapshot.docs.map((documentSnapshot) => {
            return {
              id: documentSnapshot.id,
              ...documentSnapshot.data(),
            };
          });

          this.$store.commit("SET_BOOKINGS", bookingsArray);
        });
    },
    fetchOnlineRiders() {
      firebase
        .firestore()
        .collection("drivers")
        .where("isOnline", "==", true)
        .where("accepted", "==", true)
        .where("status", "==", 1)
        .orderBy("onlinedAt", "desc")
        /* .orderBy("createdAt") */
        .onSnapshot((querySnapshot) => {
          const ridersArray = querySnapshot.docs.map((documentSnapshot) => {
            return {
                id: documentSnapshot.id,
                ...documentSnapshot.data(),
                divider: true,
                inset: true,
              };
          });

          this.$store.commit("SET_ONLINE_RIDERS", ridersArray);
        });
    },
    async dispatchRider(item) {
      console.log("LEN: " +this.allOnlineRiders.length)
      this.dispatchingDialog = true
      console.log("BOOK ID: " +item.id)
      if(this.allOnlineRiders.length > this.dispatchIndex) {
        console.log("BOOKINGS")
        var bokkingRef = firebase
        .firestore()
        .collection("bookings")
        .doc(item.id);

      console.log("DRIVERS")
      var driverRef = firebase
        .firestore()
        .collection("drivers")
        .doc(this.allOnlineRiders[this.dispatchIndex].id);


        console.log("BOOKING_DISPATCH")
       var bookingsDispatchRef = firebase
        .firestore()
        .collection("drivers")
        .doc(this.allOnlineRiders[this.dispatchIndex].id)
        .collection("bookings_dispatch")
        console.log("DRIVER DISPATCHED: " +this.allOnlineRiders[this.dispatchIndex].id)

      // Set the "capital" field of the city 'DC'
      await bookingsDispatchRef
        .add({
          bookingId: item.id,
          arrivedAt: null,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          destination: item.destination,
          distance: item.distance,
          driverId: this.allOnlineRiders[this.dispatchIndex].id,
          driverName: `${this.allOnlineRiders[this.dispatchIndex].fname} ${this.allOnlineRiders[this.dispatchIndex].lname}`,
          fare: item.fare,
          isAccepted: false,
          origin: item.origin,
          passengerId: item.passengerId,
          passengerName: item.passengerName,
          pickupAt: null,
          status: 1,
        })
        .then(async(docRef) => {
          console.log("bookdispatchdocid: " +docRef.id)
          console.log("Document successfully updated!");
          var date = new Date()
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          var strTime = hours + ':' + minutes + ' ' + ampm;

          firebase.firestore().collection("bookings").doc(item.id).collection("timeline").add({
            time: strTime,
            title: "Dispatched", 
            description: `Your book is dispatched to ${this.allOnlineRiders[this.dispatchIndex].fname} ${this.allOnlineRiders[this.dispatchIndex].lname}`,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            step: 1
          })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });

          bokkingRef
          .update({
            isDispatch: true,
            driverName: `${this.allOnlineRiders[this.dispatchIndex].fname} ${this.allOnlineRiders[this.dispatchIndex].lname}`,
            driverId: this.allOnlineRiders[this.dispatchIndex].id,
          })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
        
          
          this.interval = setInterval(() => {

            firebase.firestore()
              .collection("drivers")
              .doc(this.allOnlineRiders[this.dispatchIndex].id)
              .collection("bookings_dispatch")
              .doc(docRef.id)
            .onSnapshot((doc) => {
              if (doc.data().isAccepted) {
                clearInterval(this.interval);
                console.log("APPROVED")
                this.dispatchingDialog = false
                this.dispatchIndex = 0
                this.countdown = 0
                this.$swal({
                  icon: 'success',
                  title: `Book of ${item.passengerName} is Accepted by ${doc.data().driverName}`,
                  showConfirmButton: false,
                  timer: 1500
                })

              }
            });

            if (this.countdown === 0) {
              clearInterval(this.interval);
              this.dispatchingDialog = false;
              bokkingRef
              .update({
                isDispatch: false,
                hasRider: false,
                driverId: "",
                driverName: "",
                status: 1,
              })
              .then(() => {
                console.log("Document booking successfully updated!");
              })
              .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });

              driverRef
                .update({
                  status: 1,
                })
                .then(() => {
                  console.log("Document driver successfully updated!");
                })
                .catch((error) => {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });

              console.log("RIDER INDEX: " +this.dispatchIndex)
              console.log("RIDER ID: " +this.allOnlineRiders[this.dispatchIndex].id)
              console.log("BOOK DISPATCH ID: " +docRef.id)
              firebase
              .firestore()
              .collection("drivers")
              .doc(this.allOnlineRiders[this.dispatchIndex].id)
              .collection("bookings_dispatch")
              .doc(docRef.id)
              .update({
                status: 0,
              })
              .then(() => {
                console.log("Document bookingDispatch successfully updated!");
              })
              .catch((error) => {
                // The document probably doesn't exist.\
                console.error("Error updating document: ", error);
              });
              this.dispatchIndex++;
            }
            this.countdown -= 10;
          }, 1000);

        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
        
        this.countdown = 100;
        console.log(this.dispatchIndex)
        this.currentlyDriverToDispatch = `${this.allOnlineRiders[this.dispatchIndex].fname} ${this.allOnlineRiders[this.dispatchIndex].lname}`
      } else {
        this.countdown = 100;
        this.dispatchIndex = 0;
        this.dispatchRider(item)
      }
    },
    rejectBook(item) {
      var bokkingRef = firebase
        .firestore()
        .collection("bookings")
        .doc(item.id);

      bokkingRef
        .update({
          status: 0,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    distance(lat1, lon1, lat2, lon2, unit) {
      if (lat1 == lat2 && lon1 == lon2) {
        return 0;
      } else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
          dist = dist * 1.609344;
        }
        if (unit == "N") {
          dist = dist * 0.8684;
        }
        return dist;
      }
    },
  },
  mounted() {
    this.fetchBookings();
    this.fetchOnlineRiders();
  },
  computed: mapGetters(["allBookings", "allOnlineRiders"]),
};
</script>

<style></style>
