import { createStore } from "vuex";
import firestore from "@/firestore";

import {
  collection,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import GitAPIService from "@/services/GitAPIService.js";

const allTeamsURL = "https://api.github.com/orgs/coding-bootcamps-eu/teams";
export default createStore({
  plugins: [],
  state: {
    currentUser: {},
    currentUserRole: "",
    currentUserName: "",
    currentUserID: "",
    currentUserToken: "",
    currentUserScreenname: "",
    currentUserEmail: "",
    currentUserGitURL: "",
    currentUserScheduleURL: "",
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
    allQuestions: [],
    usersVotedQuestion: [],
    questionFilterStatus: "All",
    userRotis: [],
    spUser: {},
    spUserQuestions: [],
  },
  mutations: {
    setspUserQuestions(state, payload) {
      state.spUserQuestions.push(payload);
    },
    setspUser(state, payload) {
      state.spUser = payload.user;
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
    setQuestionFilterStatus(state, payload) {
      state.questionFilterStatus = payload.questionFilterStatus;
    },
    setUsersVotedQuestion(state, payload) {
      state.usersVotedQuestion = payload.vote;
    },
    setAllQuestions(state, payload) {
      state.allQuestions = payload.allQuestions;
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
    setCurrentUser(state, payload) {
      sessionStorage.setItem("currentUser", JSON.stringify(payload));
      state.currentUser = payload;
    },
    setCurrentUserRole(state, payload) {
      sessionStorage.setItem("currentUserRole", payload);
      state.currentUserRole = payload;
    },
    setCurrentUserScreenname(state, payload) {
      sessionStorage.setItem("currentUserScreenname", payload.userScreenname);
      state.currentUserScreenname = payload.userScreenname;
    },
    setCurrentUserEmail(state, payload) {
      sessionStorage.setItem("currentUserEmail", payload.mail);
      state.currentUserEmail = payload.mail;
    },
    setCurrentUserGitURL(state, payload) {
      sessionStorage.setItem("currentUserGitURL", payload.gitURL);
      state.currentUserGitURL = payload.gitURL;
    },
    setCurrentUserName(state, payload) {
      sessionStorage.setItem("currentUserName", payload.userName);
      state.currentUserName = payload.userName;
    },
    setCurrentUserID(state, payload) {
      sessionStorage.setItem("currentUserID", payload.userID);
      state.currentUserID = payload.userID;
    },
    setCurrentUserToken(state, payload) {
      sessionStorage.setItem("currentUserToken", payload.userToken);
      state.currentUserToken = payload.userToken;
    },
    setUserRotis(state, payload) {
      sessionStorage.setItem("userRotis", JSON.stringify(payload.userRotis));
      state.userRotis = payload.userRotis;
    },
    setUserLoginState(state, payload) {
      sessionStorage.setItem("userLoginState", payload.isLoggedIn);
      state.userLoginState = payload.isLoggedIn;
    },
  },
  actions: {
    async setspUser(state, payload) {
      onSnapshot(doc(firestore, "all-users", payload), (doc) => {
        state.commit({
          type: "setspUser",
          user: doc.data(),
        });
      });
    },
    async setUserQuestions(state, payload) {
      const q = query(
        collection(firestore, "ama-questions"),
        where("questionAuthorID", "==", payload)
      );
      const querySnapshot = await getDocs(q);
      if (state.getters.getUserQuestions[0] ?? null) {
        console.error("Questions allready loaded");
      } else {
        querySnapshot.forEach((doc) => {
          state.commit("setspUserQuestions", {
            key: doc.id,
            data: doc.data(),
          });
        });
      }
    },
    async setUserRotis(state, payload) {
      onSnapshot(doc(firestore, "all-users", payload), (doc) => {
        state.commit({
          type: "setUserRotis",
          userRotis: doc.data().studentRotis,
        });
      });
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
            studentRotis: student.studentData.studentRotis,
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
            studentRotis: student.studentData.studentRotis,
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
        if (student.data().userRole === "student") {
          _students.push({
            studentKey: student.id,
            studentData: student.data(),
          });
        } else {
          console.error("no teachers or guests are allowed in the list");
        }
      });
      state.commit({
        type: "setAllStudents",
        allStudents: _students,
      });
    },
    setCurrentUserName(state, payload) {
      state.currentUserName = payload.userName;
    },
    updateAllQuestions(state) {
      const q = query(collection(firestore, "ama-questions"));
      onSnapshot(q, (querySnapshot) => {
        const _questions = [];
        querySnapshot.forEach((doc) => {
          _questions.push({
            questionKey: doc.id,
            questionData: doc.data(),
          });
        });
        _questions.slice(0).sort(this.compareVotes);
        state.commit({
          type: "setAllQuestions",
          allQuestions: _questions,
        });
      });
    },

    async setAllQuestions(state) {
      let _questions = [];
      const querySnapshot = await getDocs(
        collection(firestore, "ama-questions")
      );
      querySnapshot.forEach((doc) => {
        _questions.push({
          questionKey: doc.id,
          questionData: doc.data(),
        });
        _questions.slice(0).sort(this.compareVotes);
        state.commit({
          type: "setAllQuestions",
          allQuestions: _questions,
        });
      });
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
  methods: {
    compareVotes(a, b) {
      if (a.questionData.questionUpvotes > b.questionData.questionUpvotes)
        return -1;
      if (a.questionData.questionUpvotes < b.questionData.questionUpvotes)
        return 1;
      return 0;
    },
  },
  modules: {},
  getters: {
    getspUser(state) {
      return state.spUser;
    },
    getUserQuestions(state) {
      return state.spUserQuestions;
    },
    getUserRotis(state) {
      return state.userRotis;
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
    getQuestionFilterStatus(state) {
      return state.questionFilterStatus;
    },
    getUsersVotedQuestion(state) {
      return state.usersVotedQuestion;
    },
    getAllQuestions(state) {
      return state.allQuestions;
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
    getCurrentUser(state) {
      return state.currentUser;
    },
    getCurrentUserRole(state) {
      return state.currentUserRole;
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
      return state.userLoginState;
    },
  },
});
