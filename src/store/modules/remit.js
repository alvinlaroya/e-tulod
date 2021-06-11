const state = {
    remits: []
};

const getters = {
    allRemitsToday: state => state.remits
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
    SET_REMITS_TODAY: (state, payload) => {
        state.remits = payload
    }
};

export default {
    state, getters, actions, mutations
}