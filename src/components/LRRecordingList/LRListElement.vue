<template>
  <li class="lr__element-wrapper">
    <p class="lesson-topic">Titel: {{ topic }}</p>
    <p class="lesson-date">{{ date }}</p>
    <p class="description">Beschreibung: {{ description }}</p>
    <div class="link-wrapper">
      <a target="_blank" :href="playURL || shareURL" class="play">Play</a>
      <a target="_blank" :href="downloadURL" class="download">Download</a>
      <cbe-main-btn
        buttonClass="secondary"
        @click="$emit('removeRecording')"
        v-if="this.$store.getters.getCurrentUserRole === 'teacher'"
      >
        Remove
      </cbe-main-btn>
      <cbe-main-btn
        buttonClass="primary"
        @click="$emit('addDescription')"
        v-if="this.$store.getters.getCurrentUserRole === 'teacher'"
      >
        Add description
      </cbe-main-btn>
    </div>
  </li>
</template>

<script>
export default {
  name: "LRListElement",
  emits: ["removeRecording", "addDescription"],
  props: {
    date: {
      type: String,
    },
    topic: {
      type: String,
    },
    playURL: {
      type: String,
    },
    downloadURL: {
      type: String,
    },
    shareURL: {
      type: String,
    },
    description: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.lr__element-wrapper {
  border-radius: 0.25rem;
  border: 0.5px dotted var(--secondary-color);
}
.lesson-topic {
  margin: 0.5rem;
  text-align: left;
  font-weight: bold;
}
.lesson-date {
  margin: 0 0.5rem;
  text-align: left;
}
.link-wrapper {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin: 0.5rem;
}
.download {
  color: var(--background-color);
  font-weight: bold;
  background-color: var(--primary-color);
  border: 2.5px solid transparent;
  border-radius: 0.25rem;
  padding: 0.3rem 0.7rem;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  line-height: 1.5rem;
}
.play {
  color: var(--background-color);
  font-weight: bold;
  background-color: var(--secondary-color);
  border: 2.5px solid transparent;
  border-radius: 0.25rem;
  padding: 0.3rem 0.7rem;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  line-height: 1.5rem;
}
.description {
  text-align: left;
  margin-left: 0.5rem;
}
</style>
