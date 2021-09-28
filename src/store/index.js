import { createStore } from "vuex";
import Cookies from "js-cookie";
import createPersistedState from "vuex-persistedstate";

const allTeamsURL = "https://api.github.com/orgs/coding-bootcamps-eu/teams";
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
    currentUserEmail: "",
    currentUserGitURL: "",
    currentUserScheduleURL: "",
    isUserLoggedIn: false,
    cbeClasses: [],
    cbeClassCollection: [],
    currentClassMembers: [],
    currentIssuesCounter: 0,
    currentReposCounter: 0,
    issuesInfo: [],
    currentIssue: {
      name: "",
      status: "open",
      duration: null,
    },
  },
  mutations: {
    setCurrentUserScheduleURL(state, payload) {
      state.currentUserScheduleURL = payload.userScheduleURL;
    },
    setCurrentIssue(state, payload) {
      state.currentIssue = {
        name: payload.name,
        status: payload.status,
        duration: payload.duration,
      };
    },
    setIssuesInfo(state, payload) {
      state.issuesInfo = payload.issuesInfo;
    },
    setCBEClassCollection(state, payload) {
      state.cbeClassCollection = payload.cbeClassCollection;
    },
    setCurrentIssuesCounter(state, payload) {
      state.currentIssuesCounter = payload.currentIssuesCounter;
    },
    setCurrentReposCounter(state, payload) {
      state.currentReposCounter = payload.currentReposCounter;
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
    setCurrentUserEmail(state, payload) {
      state.currentUserEmail = payload.mail;
    },
    setCurrentUserGitURL(state, payload) {
      state.currentUserGitURL = payload.gitURL;
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
      let _token = "token " + this.getters.getCurrentUserToken;
      const teamsResponse = await fetch(allTeamsURL, {
        headers: {
          Accept: "application/json",
          authorization: _token,
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const allTeams = await teamsResponse.json();
      let cleanedClassList = [];
      allTeams.forEach((singleClass) => {
        if (singleClass.name.includes("Class #3")) {
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
    getCurrentUserScheduleURL(state) {
      return state.currentUserScheduleURL;
    },
    getCurrentIssue(state) {
      return state.currentIssue;
    },
    getIssuesInfo(state) {
      return state.issuesInfo;
    },
    getCBEClassCollection(state) {
      return state.cbeClassCollection;
    },
    getCurrentIssuesCounter(state) {
      return state.currentIssuesCounter;
    },
    getCurrentReposCounter(state) {
      return state.currentReposCounter;
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
    getCurrentUserEmail(state) {
      return state.currentUserEmail;
    },
    getCurrentUserGitURL(state) {
      return state.currentUserGitURL;
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
