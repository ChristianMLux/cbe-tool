import { createStore } from "vuex";
import Cookies from "js-cookie";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: (key) => Cookies.remove(key),
      },
    }),
  ],
  state: {
    currentUser: {},
    currentUserName: "",
    currentUserID: "",
    currentUserToken: "",
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
      state.currentUserID = payload.userID;
    },
    setCurrentUserToken(state, payload) {
      state.currentUserToken = payload.userToken;
    },
    setUserLoginState(state, payload) {
      state.isUserLoggedIn = payload.isLoggedIn;
    },
  },
  actions: {
    setCurrentUserName(state, payload) {
      state.currentUserName = payload.userName;
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
    getCurrentUserID(state) {
      return state.currentUserID;
    },
    getCurrentUserToken(state) {
      return state.currentUserToken;
    },
    getUserLoginState(state) {
      return state.isUserLoggedIn;
    },
  },
});
