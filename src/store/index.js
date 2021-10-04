import { createStore } from "vuex";
import Cookies from "js-cookie";
import createPersistedState from "vuex-persistedstate";
import firestore from "@/firestore";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import GitAPIService from "@/services/GitAPIService.js";

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
    allStudents: [],
    studentRepos: 0,
    studentIssues: 0,
    currentStudentRepos: 0,
  },
  mutations: {
    setCurrentStudentRepos(state, payload) {
      state.currentStudentRepos = payload.currentStudentRepos;
    },
    setStudentIssues(state, payload) {
      state.studentIssues = payload.studentIssues;
    },
    setStudentRepos(state, payload) {
      state.studentRepos = payload.studentRepos;
    },
    setAllStudents(state, payload) {
      state.allStudents = payload.allStudents;
    },
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
    async setCurrentStudentRepos(state) {
      onSnapshot(
        doc(firestore, "all-users", state.getters.getCurrentUserID),
        (doc) => {
          console.log("Current data: ", doc.data());
        }
      );
    },
    async setStudentIssues(state) {
      state.getters.getAllStudents.forEach((student) => {
        GitAPIService.printIssues(
          student.studentData.gitScreenName,
          student.studentData.gitToken
        ).then((userIssues) => {
          state.commit({
            type: "setStudentIssues",
            studentIssues: userIssues,
          });
          setDoc(doc(firestore, "all-users", student.studentKey), {
            email: student.studentData.email,
            gitDisplayName: student.studentData.gitDisplayName,
            gitScreenName: student.studentData.gitScreenName,
            gitToken: student.studentData.gitToken,
            gitURL: student.studentData.gitURL,
            userScheduleURL: student.studentData.userScheduleURL,
            id: student.studentData.id,
            userIssues: userIssues,
            userRepos: student.studentData.userRepos,
            userRole: student.studentData.userRole,
          });
        });
      });
    },
    async setStudentRepos(state) {
      state.getters.getAllStudents.forEach((student) => {
        GitAPIService.printRepos(
          student.studentData.gitScreenName,
          student.studentData.gitToken
        ).then((userRepos) => {
          state.commit({
            type: "setStudentRepos",
            studentRepos: userRepos,
          });
          setDoc(doc(firestore, "all-users", student.studentKey), {
            email: student.studentData.email,
            gitDisplayName: student.studentData.gitDisplayName,
            gitScreenName: student.studentData.gitScreenName,
            gitToken: student.studentData.gitToken,
            gitURL: student.studentData.gitURL,
            userScheduleURL: student.studentData.userScheduleURL,
            id: student.studentData.id,
            userIssues: student.studentData.userIssues,
            userRepos: userRepos,
            userRole: student.studentData.userRole,
          });
        });
      });
    },
    async setAllStudents(state) {
      let _students = [];
      const userTableSnapshot = await getDocs(
        collection(firestore, "all-users")
      );
      userTableSnapshot.forEach((student) => {
        console.log(student.data());
        _students.push({
          studentKey: student.id,
          studentData: student.data(),
        });
      });
      state.commit({
        type: "setAllStudents",
        allStudents: _students,
      });
    },
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
    getCurrentStudentRepos(state) {
      return state.currentStudentRepos;
    },
    getStudentIssues(state) {
      return state.studentIssues;
    },
    getStudentRepos(state) {
      return state.studentRepos;
    },
    getAllStudents(state) {
      return state.allStudents;
    },
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
