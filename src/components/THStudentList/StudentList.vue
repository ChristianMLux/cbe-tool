<template>
  <ul>
    <StudentListElement
      v-for="student in this.$store.getters.getAllStudents"
      :key="student.studentKey"
      :email="student.studentData.email"
      :gitDisplayName="student.studentData.gitDisplayName"
      :gitScreenName="student.studentData.gitScreenName"
      :gitToken="student.studentData.gitToken"
      :studentRotis="student.studentData.studentRotis"
      :userIssues="student.studentData.userIssues"
      :userRepos="student.studentData.userRepos"
      :gitURL="student.studentData.gitURL"
      :userScheduleURL="student.studentData.userScheduleURL"
      :studentKey="student.studentKey"
      v-bind="student"
    />
  </ul>
</template>

<script>
import StudentListElement from "@/components/THStudentList/StudentListElement.vue";
export default {
  name: "StudentList",
  components: { StudentListElement },
  async created() {
    await this.$store.dispatch("setStudentRepos");
    await this.$store.dispatch("setStudentIssues");
  },
};
</script>

<style lang="scss" scoped>
ul {
  max-width: 95%;
  margin: 0.25rem auto;
  padding: 0;
  border: 1px solid var(--primary-color);
  border-radius: 0.25rem;
}
li {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
</style>
