<template>
  <h2>StudentDetails</h2>
  <cbe-main-btn
    id="button"
    buttonClass="primary"
    @click="browseBack"
    data-cy="back-button"
    >ZURÜCK
  </cbe-main-btn>

  <section class="sd__section">
    <div class="section__wrapper">
      <p v-if="gitDisplayName">{{ gitDisplayName }}</p>
      <p v-else>{{ gitScreenName }}</p>
      <p>{{ email }}</p>
      <a :href="gitURL"><i class="fa fa-github"></i></a>
    </div>
  </section>
</template>

<script>
export default {
  name: "StudentDetails",
  data() {
    return {
      studentKey: this.$route.params.studentKey,
      email: this.$route.params.email,
      gitDisplayName: this.$route.params.gitDisplayName,
      gitScreenName: this.$route.params.gitScreenName,
      gitToken: this.$route.params.gitToken,
      gitURL: this.$route.params.gitURL,
      id: this.$route.params.id,
      userIssues: this.$route.params.userIssues,
      userRepos: this.$route.params.userRepos,
    };
  },
  methods: {
    browseBack() {
      this.$router.replace("/teacherhub");
    },
  },
  beforeRouteUpdate() {
    this.studentKey = this.$route.params.studentKey;
  },
};
</script>
