<template>
  <section class="sp__profile-section">
    <div class="sp__profile-wrapper">
      <div class="sp__student-info-wrapper">
        <p class="sp__student-name">{{ studentName }}</p>
        <p class="sp__student-class">{{ studentClass }}</p>
        <a :href="studentGitHubURL">GitHub Profile</a>
        <SPIssueCounter />
      </div>
      <div class="lp__link-wrapper">
        <router-link class="lp__entry-link" to="/learnprogress"
          >Erstelle einen Lernfortschritt-Eintrag
          <i class="fas fa-chalkboard-teacher"></i
        ></router-link>
      </div>

      <SPRepoList />
      <ul class="sp__lp-list">
        <li>Ich bin ein LearnProgress Entry</li>
      </ul>
      <ul class="sp__student-question-list">
        <li>Ich bin eine Frage</li>
      </ul>
      <ul class="sp__student-roti-list">
        <li>Ich bin ein Roti</li>
      </ul>
    </div>
  </section>
</template>
<script>
import SPRepoList from "@/components/SPRepoList/SPRepoList.vue";
import SPIssueCounter from "@/components/SPIssueCounter/SPIssueCounter.vue";
export default {
  name: "SPStudentProfile",
  components: {
    SPRepoList,
    SPIssueCounter,
  },
  data() {
    return {
      studentName: "Christian M. Lux",
      studentClass: "Class2",
      studentGitHubURL: "https://github.com/ChristianMLux",
      studentIssues: 14,
    };
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
</style>
