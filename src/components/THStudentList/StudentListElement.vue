<template>
  <li>
    <div class="th__list-wrapper">
      <p class="th__student-name">{{ gitDisplayName }}</p>
      <p class="th__student-open-issues">Issues: {{ userIssues }}</p>
      <p class="th__student-repo-counter">Repos: {{ userRepos }}</p>
      <a :href="gitURL"><i class="fa fa-github"></i></a>
    </div>
  </li>
</template>

<script>
export default {
  name: "StudentListElement",
  props: {
    gitDisplayName: {
      type: String,
    },
    userIssues: {
      type: [String, Number],
    },
    userRepos: {
      type: [String, Number],
    },
    gitURL: {
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
