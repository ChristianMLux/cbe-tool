<template>
  <section class="th__classlist-section">
    <ul
      v-for="cbeClass in cbeClasses.cbeClasses"
      :key="cbeClass.classID"
      v-bind="cbeClass"
    >
      <THClassListElement
        v-for="classMember in classMembers"
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
      classMembers: [],
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
      this.classMembers = await httpElement.json();

      console.log("members of class: ", className, " are: ", this.classMembers);
    },
  },
  mounted() {
    this.getAllClasses();
    this.cbeClasses.cbeClasses.forEach((cbeClass) => {
      this.getClassMembers(cbeClass.classID, cbeClass.className);
      this.getSingleClass(cbeClass.classID);
      console.log("ClassMembers in Created: ", this.classMembers);
      this.finalClassList.push({
        className: cbeClass.className,
        classID: cbeClass.classID,
        classMembers: this.classMembers,
      });
    });
    console.log("Final Class List: ", this.finalClassList);
  },
};
</script>
