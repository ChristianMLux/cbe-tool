<template>
  <section class="sp__profile-section">
    <div class="sp__profile-wrapper">
      <div class="sp__student-info-wrapper">
        <p class="sp__student-name">{{ studentName }}</p>
        <p class="sp__student-class">{{ studentClass }}</p>
        <a :href="studentGitHubURL">GitHub Profile</a>
      </div>
      <ul class="sp__repo-list">
        <li>Ich bin ein Repo</li>
      </ul>
      <ul class="sp__lp-list">
        <li>Ich bin ein LearnProgress Entry</li>
      </ul>
      <p class="sp__user-issues">{{ studentIssues }}</p>
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
export default {
  name: "SPStudentProfile",
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
</style>
