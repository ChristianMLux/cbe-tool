<template>
  <section class="th__section">
    <THClassList />
  </section>
</template>

<script>
import THClassList from "@/components/THClassList/THClassList.vue";
export default {
  name: "THTeacherHub",
  components: {
    THClassList,
  },
};
</script>

<style lang="scss" scoped>
.th__section {
  margin: 0 4rem 0 2.5rem;
}
</style>
