<template>
  <section class="th__classlist-section">
    <ul class="th__class-list">
      <THClassListElement
        v-for="student in classMembers"
        :key="student.id"
        v-bind="student"
      />
    </ul>
  </section>
</template>

<script>
import THClassListElement from "@/components/THClassList/THClassListElement.vue";
export default {
  name: "THClassList",
  data() {
    return {
      classMembers: [
        {
          id: 12345,
          name: "Christian M Lux",
          issuesCounter: 13,
          commitCounter: 12,
          repoCounter: 19,
          studentGitURL: "https://github.com/ChristianMLux",
        },
        {
          id: 12346,
          name: "Christian Glissario",
          issuesCounter: 10,
          commitCounter: 9,
          repoCounter: 17,
          studentGitURL: "https://github.com/glissario",
        },
      ],
    };
  },
  components: {
    THClassListElement,
  },
};
</script>
