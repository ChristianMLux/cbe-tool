<template>
  <nav class="cbe__main-nav">
    <ul class="cbe__nav-list" v-show="this.$store.getters.getUserLoginState">
      <li class="cbe__nav-element" v-if="this.$store.getters.getUserLoginState">
        <router-link
          :to="{
            name: 'Student-Profile',
            params: {
              studentKey: this.$store.getters.getCurrentUserID,
            },
          }"
          ><p class="linktext">Profile</p>
          <i class="fas fa-user-circle"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/teacherhub"
          ><p class="linktext">Teacher</p>
          <i class="fas fa-school"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/amaview"
          ><p class="linktext">AMA</p>
          <i class="fas fa-question-circle"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/rotitool"
          ><p class="linktext">ROTI</p>
          <i class="fas fa-clock"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/lessonrecordings"
          ><p class="linktext">Recordings</p>
          <i class="fas fa-video"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <CBEUserLogin />
      </li>
    </ul>
  </nav>
</template>
<script>
import CBEUserLogin from "@/components/CBEUserLogin/CBEUserLogin.vue";

import Cookies from "js-cookie";

export default {
  name: "CBEMainNavigation",
  data() {
    return {
      userLoginState: Cookies.get("userLoginState"),
    };
  },
  components: {
    CBEUserLogin,
  },
  mounted() {
    console.log(this.userLoginState);
  },
};
</script>
<style lang="scss" scoped>
nav {
  .linktext {
    margin: 0;
    padding: 0;
  }
  .cbe__nav-list {
    margin: 1rem 4rem 1rem 2.5rem;
    padding: 0rem 2rem 1rem 0rem;
    display: flex;
    flex-flow: row;
    list-style-type: none;
    align-items: baseline;
    white-space: nowrap;
    border-bottom: 0.5px solid var(--primary-color);
  }
  li a {
    color: black;
    text-decoration: none;
    padding: 0.5rem;
    margin-right: 1rem;
    border: 0.5px solid var(--primary-color);
    border-radius: 0.25rem;
    display: flex;
    flex-flow: row;
    align-items: center;
    i {
      margin-left: 0.4rem;
      color: var(--secondary-color);
      font-size: 1.2em;
    }
    &.router-link-active {
      border: 2.5px solid var(--primary-color);
      border-radius: 0.25rem;
    }
    &:focus {
      outline: none;
      border: 2.5px solid var(--success-color);
      border-radius: 0.25rem;
    }
  }
}
@media only screen and (max-width: 840px) {
  nav {
    font-size: 0.9em;
  }
}
@media only screen and (max-width: 800px) {
  nav {
    .cbe__nav-list {
      _margin: 1rem 2rem 1rem 2.5rem;
      _padding: 0.5em 0;
    }
    .cbe__nav-list > * {
      font-size: 0.8em;
    }
  }
}
@media only screen and (max-width: 720px) {
  i {
    color: var(--secondary-color);
    font-size: 1.2em;
    margin-right: 0.4rem;
  }
  .linktext {
    display: none;
  }
  nav {
    .cbe__nav-list {
      _margin: 1rem 2rem 1rem 2.5rem;
      padding: 0.5em 0;
    }
  }
}
</style>
