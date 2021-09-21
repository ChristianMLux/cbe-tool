<template>
  <li class="th__list-element">
    <div class="th__list-wrapper">
      <p class="th__student-name">{{ studentName }}</p>
      <p class="th__student-open-issues">Issues: {{ issuesCounter }}</p>
      <p class="th__student-commit-counter">{{ commitCounter }}</p>
      <p class="th__student-repo-counter">Repos: {{ reposCounter }}</p>
      <a :href="studentGitURL"><i class="fa fa-github"></i></a>
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
    reposCounter: {
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
p {
  text-align: left;
  margin: 1rem 0;
}
a {
  margin: 1rem 0;
  align-items: baseline;
}
i {
  font-size: 1.7rem;
  color: var(--primary-color);
  &:hover {
    color: var(--secondary-color);
  }
}
.th__list-wrapper {
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
}

.th__list-wrapper > * {
  width: 20%;
}
.th__student-name {
  width: 25%;
  font-weight: bold;
  text-align: justify;
}
</style>
