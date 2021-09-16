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
      type: String,
    },
    commitCounter: {
      type: String,
    },
    repoCounter: {
      type: String,
    },
    studentGitURL: {
      type: String,
    },
  },
};
</script>
