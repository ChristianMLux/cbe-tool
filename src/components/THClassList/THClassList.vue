<template>
  <section class="th__classlist-section">
    <ul
      v-for="codingClass in cbeClassCollection"
      :key="codingClass.classID"
      v-bind="codingClass"
    >
      <p>{{ codingClass.className }}</p>
      <THClassListElement
        v-for="classMember in codingClass.classMembers"
        :key="classMember.studentGitID"
        v-bind="classMember"
        :studentName="classMember.studentScreenName"
        :studentGitURL="classMember.studentGitURL"
        :issuesCounter="classMember.issuesCounter"
        :reposCounter="classMember.reposCounter"
      />
    </ul>
  </section>
</template>

<script>
import THClassListElement from "@/components/THClassList/THClassListElement.vue";
import GitAPIService from "@/services/GitAPIService.js";

export default {
  name: "THClassList",
  components: { THClassListElement },
  data() {
    return {
      cbeClasses: [],
      cbeClassCollection: [],
      allClasses: [],
      cleanedClassList: [],
      classCollection: [],
    };
  },
  methods: {
    async initCBEClasses() {
      await this.cbeClasses.cbeClasses.forEach((cbeClass) => {
        this.getClassMembers(cbeClass.classID, cbeClass.className);
      });
    },
    async getClassMembers(classID, className) {
      let _userToken = this.$store.getters.getCurrentUserToken;
      const url =
        "https://api.github.com/organizations/74352698/team/" +
        classID +
        "/members";
      const httpElement = await fetch(url, {
        headers: {
          Accept: "application/json",
          authorization: "token " + _userToken,
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      let _classMembers = await httpElement.json();
      let _membersWithIssues = [];
      _classMembers.forEach((student) => {
        GitAPIService.printRepos(
          student.login,
          this.$store.getters.getCurrentUserToken
        ).then((repos) => {
          this.$store.commit({
            type: "setCurrentReposCounter",
            currentReposCounter: repos,
          });
        });
        GitAPIService.printIssues(
          student.login,
          this.$store.getCurrentUserToken
        ).then((issues) => {
          this.$store.commit({
            type: "setCurrentIssuesCounter",
            currentIssuesCounter: issues,
          });
          _membersWithIssues.push({
            studentScreenName: student.login,
            studentGitURL: student.html_url,
            studentGitID: student.id,
            issuesCounter: this.$store.getters.getCurrentIssuesCounter,
            reposCounter: this.$store.getters.getCurrentReposCounter,
          });
        });
      });
      this.classCollection.push({
        className: className,
        classID: classID,
        classMembers: _membersWithIssues,
      });
      this.$store.commit({
        type: "setCBEClassCollection",
        cbeClassCollection: this.classCollection,
      });
    },
  },
  async created() {
    this.$store.dispatch("setCBEClasses");
    this.cbeClasses = this.$store.getters.getCBEClasses;
    this.initCBEClasses();
    this.cbeClassCollection = await this.$store.getters.getCBEClassCollection;
  },
};
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  border: 1px solid var(--primary-color);
  border-radius: 0.25rem;
}
li {
  display: flex;
  flex-flow: row;
}
</style>
