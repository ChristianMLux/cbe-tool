<template>
  <li class="outer-li">
    <ul class="th__list-wrapper">
      <li>
        <p class="th__student-name">{{ gitDisplayName }}</p>
      </li>
      <li>
        <p><a :href="userScheduleURL" target="_blank">CBE-Schedule</a></p>
      </li>
      <li>
        <p class="th__student-open-issues">
          Issues:
          {{ userIssues }}
        </p>
      </li>
      <li>
        <p class="th__student-repo-counter">Repos: {{ userRepos }}</p>
      </li>
      <li>
        <p>
          <router-link
            :to="{
              name: 'studentDetails',
              params: {
                studentKey,
                email,
                gitDisplayName,
                gitScreenName,
                gitToken,
                gitURL,
                userScheduleURL,
                id,
                studentRotis: JSON.stringify(studentRotis),
                userIssues,
                userRepos,
              },
            }"
          >
            Details</router-link
          >
        </p>
      </li>
      <li>
        <p>
          <a :href="gitURL" target="_blank"><i class="fa fa-github"></i></a>
        </p>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: "StudentListElement",
  props: {
    email: {
      type: String,
    },
    gitDisplayName: {
      type: String,
    },
    gitScreenName: {
      type: String,
    },
    gitToken: {
      type: String,
    },
    id: {
      type: [String, Number],
    },
    studentRotis: {
      type: Array,
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
    userScheduleURL: {
      type: String,
    },
    studentKey: {
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.outer-li {
  border: 1px solid var(--secondary-color);
  border-radius: 0.25rem;
  margin: 0.5rem;
}

i {
  font-size: 1.7rem;
  color: var(--primary-color);
  &:hover {
    color: var(--secondary-color);
  }
}
.th__list-wrapper {
  padding: 0;
  list-style-type: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.th__list-wrapper > li > * {
  text-align: center;
}
li > p > a {
  font-weight: bold;
  text-decoration-color: var(--secondary-color);
  color: var(--font-color);
}
.th__list-wrapper > li {
  text-align: center;
  padding: 0 0.5rem;
}
.th__list-wrapper > li:nth-child(1n + 1) {
  height: 100%;
  background: var(--background-color);
}
.th__list-wrapper > li:nth-child(2n + 1) {
  height: 100%;
  background: #f3f3f3;
}
</style>
