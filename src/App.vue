<template>
  <CBEMainHeader class="main-header" />
  <CBEMainNavigation />
  <main>
    <router-view />
  </main>
  <CBEMainFooter />
</template>

<script>
import CBEMainFooter from "@/components/CBEMainFooter/CBEMainFooter.vue";
import CBEMainHeader from "@/components/CBEMainHeader/CBEMainHeader.vue";
import CBEMainNavigation from "@/components/CBEMainNavigation/CBEMainNavigation.vue";
export default {
  name: "App",
  components: { CBEMainNavigation, CBEMainHeader, CBEMainFooter },
  async created() {
    await this.$store.dispatch("setAllStudents");
  },
  mounted() {
    this.$store.commit({
      type: "setUserLoginState",
      isLoggedIn: sessionStorage.getItem("userLoginState"),
    });
    this.$store.commit({
      type: "setCurrentUserToken",
      userToken: sessionStorage.getItem("currentUserToken"),
    });
    this.$store.commit({
      type: "setCurrentUserID",
      userID: sessionStorage.getItem("currentUserID"),
    });
    this.$store.commit({
      type: "setCurrentUserName",
      userName: sessionStorage.getItem("currentUserName"),
    });
    this.$store.commit({
      type: "setCurrentUserGitURL",
      gitURL: sessionStorage.getItem("currentUserGitURL"),
    });
    this.$store.commit({
      type: "setCurrentUserEmail",
      mail: sessionStorage.getItem("currentUserEmail"),
    });
    this.$store.commit({
      type: "setCurrentUserScreenname",
      userScreenname: sessionStorage.getItem("currentUserScreenname"),
    });
    this.$store.commit(
      "setCurrentUserRole",
      sessionStorage.getItem("currentUserRole")
    );
    this.$store.commit(
      "setCurrentUser",
      JSON.parse(sessionStorage.getItem("currentUser"))
    );
    this.$store.commit("setUserRotis", {
      userRotis: JSON.parse(sessionStorage.getItem("userRotis")),
    });
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
:root {
  --primary-color: #6a1cc3;
  --secondary-color: #a161e9;
  --background-color: #fafafa;
  --success-color: #a3db33;
  --fail-color: #ed3221;
  --font-color: #121212;
  --light-grey: rgba(211, 211, 211, 0.493);
  --placeholder-color: rgba(18, 18, 18, 0.493);
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  line-height: 1.5rem;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
html {
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
  background-color: var(--background-color);
  color: var(--font-color);
  h1 {
    font-size: 2.2rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.8rem;
  }
}
body {
  margin: 0 auto;
  max-width: 120ch;
  min-width: 350px;
}
.btn {
  margin: 0.5rem 0;
}
.mobile-heading {
  display: none;
}
@media screen and (max-width: 975px) {
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.8rem;
  }
  h3 {
    font-size: 1.6rem;
  }
}
@media screen and (max-width: 720px) {
  h1 {
    font-size: 1.8rem;
  }
  h2 {
    font-size: 1.6rem;
  }
  h3 {
    font-size: 1.4rem;
  }
}

@media screen and (max-width: 555px) {
  main,
  header,
  footer {
    margin-left: 4rem;
  }
  .main-header {
    display: none;
  }
  .app-style {
    display: grid;
    height: 100vh;
  }
  .mobile-heading {
    display: inherit;
    text-align: left;
    margin-left: 0.5rem;
  }
  footer {
    display: grid;
    align-items: end;
  }
}
</style>
