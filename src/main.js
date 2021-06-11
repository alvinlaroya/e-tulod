import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import VueSweetalert2 from 'vue-sweetalert2';
import moment from 'moment'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})

const firebaseConfig = {
  apiKey: "AIzaSyBZ3WCsXh_ZdvNWqmdvJiCHq_q622moHV4",
  authDomain: "e-tulod.firebaseapp.com",
  projectId: "e-tulod",
  storageBucket: "e-tulod.appspot.com",
  messagingSenderId: "292636393408",
  appId: "1:292636393408:web:9030acbd9fe57d62a89225",
  measurementId: "G-9W6K2WBHT2"
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

Vue.use(firestorePlugin)
Vue.use(require('vue-moment')); // Vue plugin for converting timestamp to date

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
