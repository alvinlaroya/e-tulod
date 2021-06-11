<template>
  <div>
    <v-container style="padding: 20px; margin-top: -20px" fluid
      ><br />
      <h3 style="font-weight: 400">Hi, Welcome Back!</h3>
      <span style="font-size: 13px"
        >Welcome to E-Tulod <router-link to="/dashboard">Admin Dashboard</router-link> / Driver Registration</span
      >
    </v-container>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="12" md="12" lg="12">
          <v-card ref="form">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      ref="fname"
                      v-model="fname"
                      :rules="[() => !!fname || 'This field is required']"
                      :error-messages="errorMessages"
                      label="First Name"
                      placeholder="John"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      ref="mname"
                      v-model="mname"
                      :rules="[() => !!mname || 'This field is required']"
                      :error-messages="errorMessages"
                      label="Middle Name"
                      placeholder="Queva"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      ref="lname"
                      v-model="lname"
                      :rules="[() => !!lname || 'This field is required']"
                      :error-messages="errorMessages"
                      label="Last Name"
                      placeholder="Doe"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      ref="contact"
                      v-model="contact"
                      :rules="[() => !!contact || 'This field is required']"
                      :error-messages="errorMessages"
                      label="Contact"
                      placeholder="09123456789"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      ref="address"
                      v-model="address"
                      :rules="[() => !!address || 'This field is required']"
                      :error-messages="errorMessages"
                      label="Address"
                      placeholder="San Agustin East Agoo, La Unon"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      ref="email"
                      v-model="email"
                      :rules="[() => !!email || 'This field is required']"
                      :error-messages="errorMessages"
                      label="Email"
                      placeholder="etulod@gmail.com"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      ref="password"
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[() => !!address || 'This field is required']"
                      :error-messages="errorMessages"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Normal with hint text"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-slide-x-reverse-transition>
                <v-tooltip v-if="formHasErrors" left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      class="my-0"
                      v-bind="attrs"
                      @click="resetForm"
                      v-on="on"
                    >
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>Refresh form</span>
                </v-tooltip>
              </v-slide-x-reverse-transition>
              <v-btn color="primary" text @click="submit">
                Register
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  data: () => ({
    errorMessages: "",
    formHasErrors: false,
    fname: "",
    mname: "",
    lname: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    driverLicense: "none",
    profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRAGGfNNfoB0838CXXuGypUlJ8xL1ugTe3iQ&usqp=CAU",
    coordinates: null,
    show1: "",
  }),

  computed: {
    form() {
      return {
        fname: this.fname,
        mname: this.mname,
        lname: this.lname,
        address: this.address,
        contact: this.contact,
        email: this.email,
        password: this.password,
      };
    },
  },

  watch: {
    name() {
      this.errorMessages = "";
    },
  },

  methods: {
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    async submit() {
      var self = this;
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;

         this.$refs[f].validate(true);
      });

      if (!this.formHasErrors) {
        try {
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((cred) => {
              firebase
                .firestore()
                .collection("drivers")
                .doc(cred.user.uid)
                .set({
                  id: cred.user.uid,
                  fname: this.fname,
                  mname: this.mname,
                  lname: this.lname,
                  address: this.address,
                  contact: this.contact,
                  email: this.email,
                  driverLicense: this.driverLicense,
                  profile: this.profile,
                  accepted: false,
                  hasDriverLicense: false,
                  declined: false,
                  token: "",
                  status: 0,
                  isOnline: false,
                  onlinedAt: firebase.firestore.Timestamp.fromDate(new Date())
                })
                .then(() => {
                  console.log("Document successfully written!");
                  this.$swal({
                    icon: "success",
                    title: "Saved!",
                    text: `Rider ${self.fname} ${self.lname} succesfully registered but not yet approved!`,
                  });

                  Object.keys(this.form).forEach((f) => {
                    this.$refs[f].reset();
                  });
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>

<style></style>
