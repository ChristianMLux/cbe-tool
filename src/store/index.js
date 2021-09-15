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
  actions: {
    setCurrentUserName(state, payload) {
      state.currentUserName = payload.userName;
      console.log(state.currentUserName);
    },
  },
  modules: {},
  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    },
    getCurrentUserName(state) {
      return state.currentUserName;
    },
  },
});
