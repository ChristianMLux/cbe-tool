<template>
  <section class="sd__section">
    <div class="heading__wrapper">
      <h2 v-if="gitDisplayName">{{ gitDisplayName }}</h2>
      <h2 v-else>{{ gitScreenName }}</h2>
      <cbe-main-btn
        id="button"
        class="btn"
        buttonClass="primary"
        @click="browseBack"
        data-cy="back-button"
        >ZURÜCK
      </cbe-main-btn>
      <cbe-main-btn
        id="updateBTN"
        class="btn"
        buttonClass="primary"
        @click="update"
        >Update
      </cbe-main-btn>
    </div>
    <div class="detail__wrapper">
      <p>Offene Issues: {{ userIssues }}</p>
      <p>Repos: {{ userRepos }}</p>
      <p>{{ email }}</p>
      <a :href="gitURL"><i class="fa fa-github"></i></a>
    </div>
    <fieldset class="roti-fieldset">
      <legend>Student-ROTIs</legend>
      <ul class="roti-list">
        <li v-for="(roti, id) in studentRotis" :key="id" v-bind="roti">
          <p class="roti-rating">Rating: {{ roti.rotiRating }}</p>
          <p class="roti-message">Message: {{ roti.rotiMessage }}</p>
          <p class="roti-Date">Date: {{ roti.rotiDate }}</p>
        </li>
      </ul>
    </fieldset>

    <IssuesAnalyze :gitScreenName="gitScreenName" :gitToken="gitToken" />
  </section>
</template>

<script>
import IssuesAnalyze from "@/components/IssuesAnalyze/IssuesAnalyze.vue";

export default {
  name: "StudentDetails",
  components: { IssuesAnalyze },
  data() {
    return {
      studentKey: this.$route.params.studentKey,
      email: this.$route.params.email,
      gitDisplayName: this.$route.params.gitDisplayName,
      gitScreenName: this.$route.params.gitScreenName,
      gitToken: this.$route.params.gitToken,
      gitURL: this.$route.params.gitURL,
      userScheduleURL: this.$route.params.userScheduleURL,
      id: this.$route.params.id,
      studentRotis: this.$route.params.studentRotis,
      userIssues: this.$route.params.userIssues,
      userRepos: this.$route.params.userRepos,
    };
  },
  methods: {
    update() {
      this.setStudentRotis();
    },
    setStudentRotis() {
      this.studentRotis = JSON.parse(this.$route.params.studentRotis);
    },
    browseBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.setStudentRotis();
  },
  beforeRouteUpdate() {
    this.studentKey = this.$route.params.studentKey;
  },
};
</script>

<style lang="scss" scoped>
section {
  margin: 1rem 4rem 1rem 2.5rem;
}
.heading__wrapper {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin-top: 1rem;
    padding-top: 0;
  }
  .btn {
    max-height: 2.5rem;
    margin-top: 0 !important;
  }
}
.detail__wrapper {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}

.roti-list > li:nth-child(1n + 1) {
  color: var(--font-color);
  background-color: var(--light-grey);
  border-bottom: 1px solid var(--primary-color);
}
.roti-list > li:nth-child(2n + 2) {
  color: var(--font-color);
  background-color: snow;
}

.roti-list {
  list-style-type: none;
  padding: 0;
}
.roti-list > li {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  padding: 0.5rem;
}
.roti-fieldset {
  text-align: left;
  border-radius: 0.25rem;
  border: 1px dotted var(--primary-color);
}
</style>
