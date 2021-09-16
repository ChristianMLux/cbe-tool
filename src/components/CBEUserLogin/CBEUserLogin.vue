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
    };
  },
  methods: {
    async signInGit() {
      firestore;
      const auth = getAuth();
      const provider = new GithubAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        this.$store.commit("setCurrentUser", result.user);
        if (result.user.displayName != null) {
          this.$store.commit({
            type: "setCurrentUserName",
            userName: result.user.displayName,
          });
        } else {
          this.$store.commit({
            type: "setCurrentUserName",
            userName: result.user.reloadUserInfo.screenName,
          });
        }
        this.$store.commit({
          type: "setCurrentUserID",
          userID: result.user.uid,
        });
        this.$store.commit({
          type: "setCurrentUserScreenname",
          userID: result.user.reloadUserInfo.screenName,
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

        this.user = result.user;
        this.userID = result.user.uid;
        this.userName = result.user.displayName;
        this.$router.push("/");
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
