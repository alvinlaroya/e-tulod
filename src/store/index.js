import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

// vuex modules
import driver from './modules/driver'
import booking from './modules/booking'
import remit from './modules/remit'

Vue.use(Vuex)

const dataState = createPersistedState({
  paths: ['session']
})

export default new Vuex.Store({
  state: {
    session: {},
    admin: 'Admin'
  },
  plugins: [dataState],
  mutations: {
  },
  actions: {
  },
  modules: {
    driver,
    booking,
    remit
  }
})
 