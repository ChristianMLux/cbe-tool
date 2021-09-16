<template>
  <li class="th__list-element">
    <div class="th__list-wrapper">
      <p class="th__student-name">{{ studentName }}</p>
      <p class="th__student-open-issues">{{ issuesCounter }}</p>
      <p class="th__student-commit-counter">{{ commitCounter }}</p>
      <p class="th__student-repo-counter">{{ repoCounter }}</p>
      <a :href="studentGitURL">GitHub-Profil</a>
    </div>
  </li>
</template>

<script>
export default {
  name: "THClassListElement",
  props: {
    studentName: {
      type: String,
    },
    issuesCounter: {
      type: [String, Number],
    },
    commitCounter: {
      type: [String, Number],
    },
    repoCounter: {
      type: [String, Number],
    },
    studentGitURL: {
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
li {
  border: 1px solid var(--secondary-color);
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 0.5rem;
}
.th__list-wrapper {
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: baseline;
  justify-content: space-between;
}
</style>
