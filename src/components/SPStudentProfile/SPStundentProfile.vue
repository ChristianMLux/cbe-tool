<template>
  <section class="sp__profile-section">
    <div class="sp__profile-wrapper">
      <div class="sp__student-info-wrapper">
        <p class="sp__student-name">
          {{ this.$store.getters.getspUser.gitDisplayName }}
        </p>
        <a :href="this.$store.getters.getspUser.gitURL">GitHub Profile</a>
        <span class="sp__issue-count"
          >Open Issues: {{ this.$store.getters.getspUser.userIssues }}</span
        >
      </div>
      <div class="lp__link-wrapper">
        <router-link class="lp__entry-link" to="/learnprogress"
          >Erstelle Lernfortschritt-Eintrag
          <i class="fas fa-chalkboard-teacher"></i
        ></router-link>
      </div>
      <ul class="sp__lp-list">
        <li>Ich bin ein LearnProgress Entry</li>
      </ul>
      <ul class="sp__student-question-list">
        <li>Ich bin eine Frage</li>
      </ul>
      <ul class="sp__student-roti-list">
        <legend>Roti-Liste</legend>
        <li
          class="roti-list-entry"
          v-for="roti in this.$store.getters.getUserRotis"
          :key="roti.key"
          v-bind="roti"
        >
          <p class="roti-rating">{{ roti.rotiRating }}</p>
          <p class="roti-message">{{ roti.rotiMessage }}</p>
          <p class="roti-date">{{ roti.rotiDate }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  name: "SPStudentProfile",
  data() {
    return {
      userID: this.$route.params.studentKey,
    };
  },
  async created() {
    await this.$store.dispatch("setUserRotis", this.$route.params.studentKey);
    await this.$store.dispatch("setspUser", this.$route.params.studentKey);
  },
};
</script>
<style lang="scss" scoped>
.sp__profile-section {
  margin: 0 4rem 0 2.5rem;
}
.sp__student-info-wrapper {
  margin: 1rem 0;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-flow: row;
  align-items: baseline;
  border: 1px solid var(--secondary-color);
  border-radius: 0.25rem;
}
.lp__entry-link {
  margin: 5rem;
  padding: 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 0.25rem;
}
.lp__link-wrapper {
  margin: 2rem;
  align-items: left;
  a {
    color: var(--font-color);
    text-decoration: none;
  }
  i {
    color: var(--secondary-color);
  }
}
.sp__student-roti-list {
  border: 0.5px solid var(--secondary-color);
  border-radius: 0.25rem;
  padding: 0;
}
.sp__student-roti-list > li:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.sp__student-roti-list > li:last-child {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
.sp__student-roti-list > li:nth-child(1n + 1) {
  background: snow;
}
.sp__student-roti-list > li:nth-child(2n + 2) {
  background: var(--light-grey);
}

.roti-list-entry {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  padding: 0.5rem;
}
.roti-message {
  flex-grow: 1;
  padding-left: 1rem;
  text-align: left;
}
</style>
