const state = {
    driversToVerify: [],
    onlineRiders: [],
    drivers: []
};

const getters = {
    allDriversToVerify: state => state.driversToVerify,
    allOnlineRiders: state => state.onlineRiders,
    allDrivers: state => state.drivers
};

const actions = {
    /* async fetchUnderCategories({ commit }, restoId) {
        let params = { restaurantId: restoId}
        const response = await Parse.Cloud.run("fetchCategoriesUnderResto", params);
        let stringifyResponse = JSON.stringify(response)
        let jsonResponse = JSON.parse(stringifyResponse)
        const [underCategories, categoriesAutoComplete] = jsonResponse;
        commit('setUnderCategories', underCategories);
        commit('setCategoriesAutoComplete', categoriesAutoComplete);
    }, */
};
  
const mutations = {
    setUnknown: (state, status) => { 
        console.log(state, status)
    },
    /* setCategories: (state, categories) => {
        state.categories = categories
    }, */
    SET_DRIVERS_TO_VERIFY: (state, drivers) => {
        state.driversToVerify = drivers
    },
    SET_ONLINE_RIDERS: (state, drivers) => {
        state.onlineRiders = drivers
    },
    SET_RIDERS: (state, drivers) => {
        state.drivers = drivers
    }
};

export default {
    state, getters, actions, mutations
}