<template>
  <nav class="cbe__main-nav">
    <ul class="cbe__nav-list">
      <li class="cbe__nav-element">
        <router-link to="/studentprofile"
          >Your Profile <i class="fas fa-user-circle"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/amatool"
          >AMA-Tool <i class="fas fa-question-circle"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/rotitool"
          >ROTI-Tool <i class="fas fa-clock"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/lessonrecordings"
          >Lesson-Recordings <i class="fas fa-video"></i
        ></router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "CBEMainNavigation",
};
</script>
<style lang="scss" scoped>
nav {
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
@media only screen and (max-width: 814px) {
  nav {
    .cbe__nav-list {
      margin: 1rem 2rem 1rem 2.5rem;
      padding: 0.5em 0;
    }
    .cbe__nav-list > * {
      font-size: 0.8em;
    }
  }
}
</style>
