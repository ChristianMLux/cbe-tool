<template>
  <div class="sp__class-wrapper">
    <p>{{ currentUserClass }}</p>
  </div>
</template>

<script>
export default {
  name: "SPStudentClass",
  data() {
    return {
      currentUserClass: "",
      currentUserTeams: [],
      allClasses: [],
      cleanedClassList: [],
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
      console.log(this.cleanedClassList);
    },
    async getSingleClass() {
      const url = "https://api.github.com/orgs/coding-bootcamps-eu/teams";
      const httpElement = await fetch(url, {
        headers: {
          Accept: "application/json",
          authorization: "token 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",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      this.currentUserTeams = await httpElement.json();
      console.log(this.currentUserTeams);
    },
  },
  created() {
    this.getAllClasses();
    this.getCurrentUserClass();
  },
};
</script>
