<template>
  <div class="login">
    <div class="user-logged-in" v-show="user">
      <button @click="signOut" class="btn-git-logout">Logout</button>
      <p class="user-name">{{ userName }}</p>
    </div>
    <button v-show="!user" @click="signInGit" class="btn-git-login">
      Login with GitHub <i class="fa fa-github"></i>
    </button>
  </div>
</template>

<script>
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import firebase from "@/firebase";

export default {
  name: "CBEUserLogin",
  data() {
    return {
      user: sessionStorage.getItem("user"),
      userID: sessionStorage.getItem("userID"),
      userName: sessionStorage.getItem("userName"),
    };
  },
  methods: {
    async signInGit() {
      firebase;
      const auth = getAuth();
      const provider = new GithubAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        sessionStorage.setItem("user", user);
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem("userID", result.user.uid);
        if (result.user.displayName != null) {
          sessionStorage.setItem("userName", result.user.displayName);
        } else {
          sessionStorage.setItem(
            "userName",
            result.additionalUserInfo.username
          );
        }
        this.user = result.user;
        this.userID = result.user.uid;
        this.userName = result.user.displayName;
        this.$router.replace("/");
        location.reload();
      });
    },
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.user = null;
          sessionStorage.clear();
          this.$router.replace("/");
          location.reload();
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
  margin: 0 2rem 0 0;
}
.user-logged-in {
  display: flex;
  flex-flow: row;
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
  padding: 0.4rem;
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
