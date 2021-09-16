<template>
  <div class="sp__class-wrapper">
    <p>{{ currentUserClass }}</p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "SPStudentClass",
  setup() {
    const store = useStore();

    const cbeClasses = computed(() => store.state.cbeClasses);
    const currentUserToken = computed(() => store.state.currentUserToken);
    const currentUser = computed(() => store.state.currentUser);
    const currentUserScreenname = computed(
      () => store.state.currentUserScreenname
    );

    return {
      currentUserToken,
      currentUser,
      currentUserScreenname,
      cbeClasses,
    };
  },
  data() {
    return {
      currentUserClass: "",
      currentUserTeams: [],
      allClasses: [],
      cleanedClassList: [],
      singleClass: [],
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
  },
  created() {
    this.getAllClasses();
    this.cbeClasses.cbeClasses.forEach((cbeClass) => {
      this.getSingleClass(cbeClass.classID);
    });
  },
};
</script>
