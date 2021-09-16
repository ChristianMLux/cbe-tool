<template>
  <section class="th__classlist-section">
    <ul
      v-for="codingClass in classCollection"
      :key="codingClass.classID"
      v-bind="codingClass"
    >
      <p>{{ codingClass.className }}</p>
      <THClassListElement
        v-for="classMember in codingClass.classMembers"
        :key="classMember.id"
        v-bind="classMember"
        :studentName="classMember.login"
        :studentGitURL="classMember.html_url"
      />
    </ul>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

import THClassListElement from "@/components/THClassList/THClassListElement.vue";
export default {
  name: "THClassList",
  components: { THClassListElement },
  setup() {
    const store = useStore();

    const cbeClasses = computed(() => store.state.cbeClasses);

    return {
      cbeClasses,
    };
  },
  data() {
    return {
      allClasses: [],
      cleanedClassList: [],
      singleClass: [],
      classCollection: [],
      finalClassList: [],
    };
  },
  methods: {
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
      console.log("cleaned ClassList: ", this.cbeClasses.cbeClasses);
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
      console.log("single class: ", this.singleClass);
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
      this.classCollection.push({
        className: className,
        classID: classID,
        classMembers: _classMembers,
      });
      console.log("classCollection: ", this.classCollection);
      console.log("_classMembers: ", _classMembers, className);
    },
  },
  mounted() {
    this.getAllClasses();
    this.cbeClasses.cbeClasses.forEach((cbeClass) => {
      this.getClassMembers(cbeClass.classID, cbeClass.className);
      this.getSingleClass(cbeClass.classID);
    });
    console.log(
      "DAS IST CLassCollection Class Members: ",
      this.classCollection.classMembers
    );
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
