<template>
  <h2 class="mobile-heading">Ask Me Anything</h2>
  <AskQuestion />
  <QuestionList />
</template>
<script>
import AskQuestion from "./AskQuestion.vue";
import QuestionList from "./QuestionList.vue";
export default {
  name: "AMATool",
  components: { AskQuestion, QuestionList },
};
</script>

<style lang="scss" scoped>
section {
  margin: 0;
}
</style>
