<template>
  <LPStudentEntry />
</template>

<script>
import LPStudentEntry from "@/components/LPLearnProgress/LPStudentEntry.vue";
export default {
  name: "LPMainView",
  components: {
    LPStudentEntry,
  },
  data() {
    return {
      student: true,
      teacher: false,
    };
  },
};
</script>
