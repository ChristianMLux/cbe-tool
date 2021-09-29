<template>
  <section>
    <AskQuestion />
    <QuestionList />
  </section>
</template>
<script>
import AskQuestion from "./AskQuestion.vue";
import QuestionList from "./QuestionList.vue";
export default {
  name: "AMATool",
  components: { AskQuestion, QuestionList },
};
</script>
