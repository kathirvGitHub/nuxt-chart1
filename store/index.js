export const state = () => {
    loggedUser: null
}

export const mutations = {
    SET_USER (state, loggedUser) {
        state.loggedUser = loggedUser || null;
    }
}

export const getters = {
    getLoggedUser (state) {
        console.log('inside getter')
        return state.loggedUser
    }
}