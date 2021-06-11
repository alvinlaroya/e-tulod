const state = {
    bookings: []
};

const getters = {
    allBookings: state => state.bookings
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
    SET_BOOKINGS: (state, books) => {
        state.bookings = books
    }
};

export default {
    state, getters, actions, mutations
}