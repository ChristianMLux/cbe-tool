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
