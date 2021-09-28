<template>
  <ul>
    <StudentListElement
      v-for="student in students"
      :key="student.studentKey"
      :email="student.studentData.email"
      :gitDisplayName="student.studentData.gitDisplayName"
      :gitScreenName="student.studentData.gitScreenName"
      :gitToken="student.studentData.gitToken"
      :userIssues="student.studentData.userIssues"
      :userRepos="student.studentData.userRepos"
      :gitURL="student.studentData.gitURL"
      :studentKey="student.studentKey"
      v-bind="student"
    />
  </ul>
</template>

<script>
import firestore from "@/firestore";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

import GitAPIService from "@/services/GitAPIService.js";
import StudentListElement from "@/components/THStudentList/StudentListElement.vue";
export default {
  name: "StudentList",
  components: { StudentListElement },
  data() {
    return {
      students: [],
    };
  },
  methods: {
    async getAllStudents() {
      const userTableSnapshot = await getDocs(
        collection(firestore, "all-users")
      );
      userTableSnapshot.forEach((student) => {
        this.students.push({
          studentKey: student.id,
          studentData: student.data(),
        });
      });
    },
    async updateStudentRepos() {
      this.students.forEach((student) => {
        GitAPIService.printRepos(
          student.studentData.gitScreenName,
          student.studentData.gitToken
        ).then((userRepos) => {
          console.log(userRepos);
          setDoc(doc(firestore, "all-users", student.studentKey), {
            email: student.studentData.email,
            gitDisplayName: student.studentData.gitDisplayName,
            gitScreenName: student.studentData.gitScreenName,
            gitToken: student.studentData.gitToken,
            gitURL: student.studentData.gitURL,
            id: student.studentData.id,
            userIssues: student.studentData.userIssues,
            userRepos: userRepos,
            userRole: student.studentData.userRole,
          });
        });
      });
    },
    async updateStudentIssues() {
      this.students.forEach((student) => {
        GitAPIService.printIssues(
          student.studentData.gitScreenName,
          student.studentData.gitToken
        ).then((userIssues) => {
          console.log(userIssues);
          setDoc(doc(firestore, "all-users", student.studentKey), {
            email: student.studentData.email,
            gitDisplayName: student.studentData.gitDisplayName,
            gitScreenName: student.studentData.gitScreenName,
            gitToken: student.studentData.gitToken,
            gitURL: student.studentData.gitURL,
            id: student.studentData.id,
            userIssues: userIssues,
            userRepos: student.studentData.userRepos,
            userRole: student.studentData.userRole,
          });
        });
      });
    },
  },
  async created() {
    await this.getAllStudents();
    await this.updateStudentRepos();
    await this.updateStudentIssues();
  },
  mounted() {
    console.log(this.students);
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
