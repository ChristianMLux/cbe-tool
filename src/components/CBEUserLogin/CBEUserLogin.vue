<template>
  <div class="login">
    <div class="user-logged-in" v-show="isUserLoggedIn">
      <button @click="signOut" class="btn-git-logout">Logout</button>
      <p class="user-name">{{ currentUserName }}</p>
    </div>
    <div class="user-logged-out" v-show="!isUserLoggedIn">
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
import { collection, setDoc, getDocs, getDoc, doc } from "firebase/firestore";
import firestore from "@/firestore";
import { useStore } from "vuex";
import { computed } from "vue";
import Cookies from "js-cookie";

export default {
  name: "CBEUserLogin",
  setup() {
    const store = useStore();

    const isUserLoggedIn = computed(() => store.state.isUserLoggedIn);
    const currentUserName = computed(() => store.state.currentUserName);

    return {
      isUserLoggedIn,
      currentUserName,
    };
  },
  data() {
    return {
      user: {},
      userID: "",
      userName: "",
      userRole: "student",
      allUser: [],
      currentTokenId: null,
      bool: false,
    };
  },
  methods: {
    async isUserInDB(accessToken) {
      const docRef = doc(firestore, "all-users", accessToken);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("SNAP:", docSnap.data());
        return true;
      } else {
        return false;
      }
    },
    async getAllUser() {
      const querySnapshot = await getDocs(collection(firestore, "all-users"));
      console.log("snap: ", querySnapshot);
      querySnapshot.forEach((user) => {
        console.log("user: ", user.key);
        this.allUser.push({
          id: user.data().id,
          gitDisplayName: user.data().gitDisplayName,
          gitScreenName: user.data().gitScreenName,
          gitToken: user.data().gitToken,
          gitURL: user.data().gitURL,
          email: user.data().email,
          userIssues: user.data().userIssues,
          userRepos: user.data().userRepos,
          userRole: user.data().userRole,
        });
        console.log(this.allUser);
      });
    },
    async signInGit() {
      firestore;
      const auth = getAuth();
      const provider = new GithubAuthProvider();
      provider.addScope("public_repo");
      signInWithPopup(auth, provider).then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        this.isUserInDB(result.user.accessToken).then((user) => {
          if (user === true) {
            console.log("User exists");
          } else {
            console.log("User does not exist", user);
            setDoc(doc(firestore, "all-users", result.user.accessToken), {
              id: this.$store.getters.getCurrentUserID,
              gitDisplayName: this.$store.getters.getCurrentUserName,
              gitScreenName: this.$store.getters.getCurrentUserScreenname,
              gitToken: this.$store.getters.getCurrentUserToken,
              gitURL: this.$store.getters.getCurrentUserGitURL,
              email: this.$store.getters.getCurrentUserEmail,
              userIssues: 0,
              userRepos: 0,
              userRole: this.userRole,
            });
          }
        });
        this.$store.commit("setCurrentUser", result.user);
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
          type: "setCurrentUserToken",
          userToken: token,
        });
        this.$store.commit({
          type: "setCurrentUser",
          userToken: result.user,
        });
        this.$store.commit({
          type: "setUserLoginState",
          isLoggedIn: true,
        });
        // put the user informations in the database
        this.user = result.user;
        this.userID = result.user.uid;
        this.userName = result.user.displayName;
        this.$router.push("/");
        this.currentTokenId = null;
      });
    },
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.user = null;
          Cookies.remove("vuex");
          this.$router.push("/loggedout");
          this.$store.commit({
            type: "setUserLoginState",
            isLoggedIn: false,
          });
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
@media only screen and (max-width: 741px) {
  .user-name {
    font-size: 0.8em;
  }
}
@media only screen and (max-width: 700px) {
  .user-name {
    display: none;
  }
}
</style>
