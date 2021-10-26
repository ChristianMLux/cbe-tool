<template>
  <nav class="cbe__main-nav">
    <ul
      class="cbe__nav-list"
      v-if="!isGuest && this.$store.getters.getUserLoginState"
    >
      <li class="cbe__nav-element" v-if="isStudent">
        <router-link
          :to="{
            name: 'Student-Profile',
            params: {
              studentKey: this.$store.getters.getCurrentUserID,
            },
          }"
          ><p class="link-text">Profile</p>
          <i class="fas fa-user-circle"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element" v-if="isTeacher">
        <router-link to="/teacherhub"
          ><p class="link-text">Teacher</p>
          <i class="fas fa-school"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/amaview"
          ><p class="link-text">AMA</p>
          <i class="fas fa-question-circle"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/rotitool"
          ><p class="link-text">ROTI</p>
          <i class="fas fa-clock"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/lessonrecordings"
          ><p class="link-text">Recordings</p>
          <i class="fas fa-video"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <CBEUserLogin />
      </li>
    </ul>
  </nav>
  <nav class="cbe__mobile-nav">
    <img
      class="header-logo"
      alt="Coding Bootcamp Europe Logo"
      src="@/assets/cbe-logo-plain.png"
    />
    <ul
      class="cbe__nav-list"
      v-if="!isGuest && this.$store.getters.getUserLoginState"
    >
      <li class="cbe__nav-element" v-if="isStudent">
        <router-link
          :to="{
            name: 'Student-Profile',
            params: {
              studentKey: this.$store.getters.getCurrentUserID,
            },
          }"
          ><p class="link-text">Profile</p>
          <i class="fas fa-user-circle"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element" v-if="isTeacher">
        <router-link to="/teacherhub"
          ><p class="link-text">Teacher</p>
          <i class="fas fa-school"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/amaview"
          ><p class="link-text">AMA</p>
          <i class="fas fa-question-circle"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/rotitool"
          ><p class="link-text">ROTI</p>
          <i class="fas fa-clock"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/lessonrecordings"
          ><p class="link-text">Recordings</p>
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
  computed: {
    isTeacher() {
      return this.$store.getters.getCurrentUserRole === "teacher"
        ? true
        : false;
    },
    isGuest() {
      return this.$store.getters.getCurrentUserRole === "guest" ? true : false;
    },
    isStudent() {
      return this.$store.getters.getCurrentUserRole === "student"
        ? true
        : false;
    },
  },
  components: {
    CBEUserLogin,
  },
  mounted() {
    //console.log(this.userLoginState);
  },
};
</script>
<style lang="scss" scoped>
.cbe__mobile-nav {
  display: none;
}
nav {
  .link-text {
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
  .link-text {
    display: none;
  }
  nav {
    .cbe__nav-list {
      _margin: 1rem 2rem 1rem 2.5rem;
      padding: 0.5em 0;
    }
  }
}

@media screen and (max-width: 555px) {
  i {
    color: black;
  }
  .cbe__main-nav {
    display: none;
  }
  .cbe__mobile-nav > * {
    margin: 0 auto;
  }
  .header-logo {
    max-width: 3rem;
    padding: 0.25rem;
    margin-top: 0.5rem;
  }
  .cbe__mobile-nav {
    display: block;
    z-index: 1;
    width: 4rem;
    height: 100vh;
    position: fixed;
    background-color: whitesmoke;
    transition: 200ms ease-in-out;
    box-shadow: var(--primary-color) 0px 0.5px 1.5px,
      rgba(0, 0, 0, 0.24) 0px 0.5px 1px;
  }
  .cbe__mobile-nav:hover {
    width: 12rem;
    .link-text {
      display: block;
      justify-content: baseline;
      align-items: baseline;
    }
    .header-logo {
      max-width: 3rem;
      padding: 0.25rem;
    }
    .cbe__nav-element {
      text-align: center;
      min-width: 95%;
      a {
        &:hover {
          width: 100%;
        }
      }
    }
  }
  .cbe__nav-list {
    all: unset;
    list-style: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: 0;
    padding: 0;
    height: 100%;
  }
  nav {
    .cbe__nav-list {
      flex-flow: column;
      margin: 0.5rem;
    }
    .cbe__nav-element {
      max-width: 95%;
      min-width: 2.5rem;
      margin: 0.5rem 0.125rem;
      transition: width 1s ease-in-out;
      &:hover {
        width: 100%;
      }
      a {
        margin: 0;
        transition: 0.25s ease-in-out;
        display: flex;
        justify-content: space-between;
        flex-flow: row;
        &:hover {
          background: var(--primary-color);
          color: var(--background-color);
          font-weight: bold;
          i {
            color: var(--background-color);
            font-size: 1.2em;
            margin-right: 0.4rem;
          }
        }
      }
    }
  }
}
</style>
