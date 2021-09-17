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
      />
    </ul>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

import THClassListElement from "@/components/THClassList/THClassListElement.vue";
import GitAPIService from "@/services/GitAPIService.js";

export default {
  name: "THClassList",
  components: { THClassListElement },
  setup() {
    const store = useStore();

    const cbeClasses = computed(() => store.state.cbeClasses);
    const currentUserToken = computed(() => store.state.currentUserToken);
    const currentCounter = computed(() => store.state.currentCounter);
    const cbeClassCollection = computed(() => store.state.cbeClassCollection);

    return {
      cbeClasses,
      currentUserToken,
      currentCounter,
      cbeClassCollection,
    };
  },
  data() {
    return {
      allClasses: [],
      cleanedClassList: [],
      singleClass: [],
      classCollection: [],
      counter: 0,
    };
  },
  methods: {
    async initCBEClasses() {
      await this.getAllClasses();
      this.cbeClasses.cbeClasses.forEach(async (cbeClass) => {
        await this.getClassMembers(cbeClass.classID, cbeClass.className);
        await this.getSingleClass(cbeClass.classID);
      });
    },
    async getAllClasses() {
      const url = "https://api.github.com/orgs/coding-bootcamps-eu/teams";
      const httpElement = await fetch(url, {
        headers: {
          Accept: "application/json",
          authorization: "token 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",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      this.allClasses = await httpElement.json();
      this.allClasses.forEach((singleClass) => {
        if (singleClass.name.includes("Class")) {
          this.cleanedClassList.push({
            className: singleClass.name,
            classID: singleClass.id,
          });
        }
      });
      this.$store.commit({
        type: "setCBEClasses",
        cbeClasses: this.cleanedClassList,
      });
    },
    async getSingleClass(teamID) {
      const url =
        "https://api.github.com/organizations/74352698/team/" + teamID;
      const httpElement = await fetch(url, {
        headers: {
          Accept: "application/json",
          authorization: "token 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",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      this.singleClass = await httpElement.json();
      //console.log("single class: ", this.singleClass);
    },
    async getClassMembers(classID, className) {
      const url =
        "https://api.github.com/organizations/74352698/team/" +
        classID +
        "/members";
      const httpElement = await fetch(url, {
        headers: {
          Accept: "application/json",
          authorization: "token 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",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      let _classMembers = await httpElement.json();
      let _cleanClassMembers = [];
      _classMembers.forEach((student) => {
        GitAPIService.printIssues(student.login).then((result) => {
          this.$store.commit({
            type: "setCurrentCounter",
            currentCounter: result,
          });
          _cleanClassMembers.push({
            studentScreenName: student.login,
            studentGitURL: student.html_url,
            studentGitID: student.id,
            issuesCounter: this.currentCounter,
          });
        });
      });
      //console.log("CLEAN CLASS MEMBERS: ", _cleanClassMembers);
      this.classCollection.push({
        className: className,
        classID: classID,
        classMembers: _cleanClassMembers,
      });
      this.$store.commit({
        type: "setCBEClassCollection",
        classCollection: this.classCollection,
      });
      //console.log("classCollection: ", this.classCollection);
      //console.log("_classMembers: ", _classMembers, className);
    },
  },
  created() {
    this.initCBEClasses();
    /*
    this.getAllClasses();
    this.cbeClasses.cbeClasses.forEach((cbeClass) => {
      this.getClassMembers(cbeClass.classID, cbeClass.className);
      this.getSingleClass(cbeClass.classID);
    });*/
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
