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
    };
  },
};
</script>
