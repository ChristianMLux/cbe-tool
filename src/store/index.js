import { createStore } from "vuex";

export default createStore({
  state: {
    currentUser: {},
    currentUserName: "",
    currentUserID: "",
    isUserLoggedIn: false,
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setCurrentUserName(state, payload) {
      state.currentUserName = payload.userName;
    },
    setCurrentUserID(state, payload) {
      state.currentUserID = payload;
    },
    setUserLoginState(state, payload) {
      state.isUserLoggedIn = payload;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getCurrentUser: (state) => {
      state.currentUser;
    },
  },
});
