<template>
  <div class="login">
    <div class="user-logged-in" v-show="this.$store.getters.getUserLoginState">
      <button @click="signOut" class="btn-git-logout">
        <i class="fas fa-sign-out-alt"></i>
      </button>
      <p class="user-name">{{ this.$store.getters.getCurrentUserName }}</p>
    </div>
    <div
      class="user-logged-out"
      v-show="!this.$store.getters.getUserLoginState"
    >
      <button @click="signInGit" class="btn-git-login">
        Login with GitHub <i class="fa fa-github"></i>
      </button>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
import firestore from "@/firestore";

export default {
  name: "CBEUserLogin",
  data() {
    return {
      userRole: "guest",
    };
  },
  computed: {
    isLoggedIn() {
      return sessionStorage.getItem("userLoginState") === true ? false : true;
    },
  },
  methods: {
    async isUserInDB(accessToken) {
      const docRef = doc(firestore, "all-users", accessToken);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.$store.commit("setCurrentUserRole", docSnap.data().userRole);
        return true;
      } else {
        return false;
      }
    },
    async signInGit() {
      firestore;
      const auth = getAuth();
      const provider = new GithubAuthProvider();
      provider.addScope("public_repo");
      signInWithPopup(auth, provider).then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        this.$store.commit("setCurrentUser", result.user);
        this.$store.commit({
          type: "setUserLoginState",
          isLoggedIn: true,
        });
        if (result.user.displayName != null) {
          this.$store.commit({
            type: "setCurrentUserName",
            userName: result.user.displayName,
          });
        } else {
          this.$store.commit({
            type: "setCurrentUserName",
            userName: result._tokenResponse.screenName,
          });
        }
        this.$store.dispatch("setUserRotis", result.user.uid);
        this.$store.commit({
          type: "setCurrentUserID",
          userID: result.user.uid,
        });
        this.$store.commit({
          type: "setCurrentUserScreenname",
          userScreenname: result._tokenResponse.screenName,
        });
        this.$store.commit({
          type: "setCurrentUserEmail",
          mail: result.user.email,
        });
        this.$store.commit({
          type: "setCurrentUserGitURL",
          gitURL: "https://github.com/" + result._tokenResponse.screenName,
        });
        this.$store.commit({
          type: "setCurrentUserScheduleURL",
          userScheduleURL:
            "https://github.com/" +
            result._tokenResponse.screenName +
            "/bootcamp-schedule/issues",
        });
        this.$store.commit({
          type: "setCurrentUserToken",
          userToken: token,
        });
        sessionStorage.setItem("user", JSON.stringify(result.user));
        sessionStorage.setItem("userLoginState", true);

        // put the user informations in the database
        this.isUserInDB(result.user.uid).then((user) => {
          if (user === true) {
            // user exists
          } else {
            setDoc(doc(firestore, "all-users", result.user.uid), {
              id: this.$store.getters.getCurrentUserID,
              gitDisplayName: this.$store.getters.getCurrentUserName,
              gitScreenName: this.$store.getters.getCurrentUserScreenname,
              gitToken: this.$store.getters.getCurrentUserToken,
              gitURL: this.$store.getters.getCurrentUserGitURL,
              userScheduleURL: this.$store.getters.getCurrentUserScheduleURL,
              email: this.$store.getters.getCurrentUserEmail,
              userIssues: 0,
              userRepos: 0,
              userRole: this.userRole,
            });
          }
        });
        this.$router.push("/");
      });
    },
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push("/loggedout");
          this.$store.commit({
            type: "setUserLoginState",
            isLoggedIn: false,
          });
          sessionStorage.clear();
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  margin: 0 0 0 0;
}
.user-logged-in {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: baseline;
  .user-name {
    margin-left: 0.5rem;
  }
}
.user-logged-out {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: baseline;
  .user-name {
    margin-left: 0.5rem;
  }
}
.btn-git-login {
  font-size: 1.2rem;
  color: var(--primary-color);
  background-color: var(--background-color);
  border: 2.5px solid;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.529rem;
}
.btn-ggl-login {
  font-size: 1.2rem;
  color: var(--fail-color);
  background-color: var(--background-color);
  border: 2.5px solid;
  border-radius: 0.25rem;
  cursor: pointer;
}
.btn-git-logout {
  font-size: 1rem;
  color: var(--primary-color);
  background-color: var(--background-color);
  border: 2.5px solid;
  border-radius: 0.25rem;
  cursor: pointer;
}
@media screen and (max-width: 975px) {
  .user-name {
    display: none;
  }
}
</style>
