<template>
  <section class="th__section">
    <StudentList />
  </section>
</template>

<script>
import StudentList from "@/components/THStudentList/StudentList.vue";
export default {
  name: "THTeacherHub",
  components: {
    StudentList,
  },
};
</script>

<style lang="scss" scoped>
.th__section {
  margin: 0 4rem 0 2.5rem;
}

@media screen and (max-width: 555px) {
  .th__section {
    margin: 0;
    max-width: 100%;
  }
}
</style>
