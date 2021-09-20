import { createStore } from "vuex";
import Cookies from "js-cookie";
import createPersistedState from "vuex-persistedstate";

const headerWithAuth = {
  Accept: "application/json",
  authorization: "token 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",
  "Content-Type": "application/json",
};
const allTeamsURL = "https://api.github.com/orgs/coding-bootcamps-eu/teams";
const methodGET = "GET";
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
    // python komibinieren mit anderen bekannten sprachen
    // Firebase / Functions
  ],
  state: {
    currentUser: {},
    currentUserName: "",
    currentUserID: "",
    currentUserToken: "",
    currentUserScreenname: "",
    isUserLoggedIn: false,
    cbeTeams: [],
    cbeClasses: [],
    cbeClassCollection: [],
    currentClassMembers: [],
    currentCounter: 0,
  },
  mutations: {
    setCBEClassCollection(state, payload) {
      state.cbeClassCollection = payload.classCollection;
    },
    setCurrentCounter(state, payload) {
      state.currentCounter = payload.currentCounter;
    },
    setCurrentClassMembers(state, payload) {
      state.currentClassMembers = payload;
    },
    setCBEClasses(state, payload) {
      state.cbeClasses = payload;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setCurrentUserScreenname(state, payload) {
      state.currentUserScreenname = payload.userScreenname;
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
    async setCBEClasses(state) {
      const teamsResponse = await fetch(
        allTeamsURL,
        { headerWithAuth },
        methodGET
      );
      const allTeams = await teamsResponse.json();
      let cleanedClassList = [];
      allTeams.forEach((singleClass) => {
        if (singleClass.name.includes("Class")) {
          cleanedClassList.push({
            className: singleClass.name,
            classID: singleClass.id,
          });
        }
      });
      state.commit({
        type: "setCBEClasses",
        cbeClasses: cleanedClassList,
      });
    },
  },
  modules: {},
  getters: {
    getCBEClassCollection(state) {
      return state.cbeClassCollection;
    },
    getCurrentCounter(state) {
      return state.currentCounter;
    },
    getCBEClasses(state) {
      return state.cbeClasses;
    },
    getCurrentClassMembers(state) {
      return state.currentClassMembers;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
    getCurrentUserName(state) {
      return state.currentUserName;
    },
    getCurrentUserScreenname(state) {
      return state.currentUserScreenname;
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
