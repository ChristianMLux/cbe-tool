<template>
  <li>
    <div class="lr__element-wrapper">
      <p>{{ date }}</p>
      <p>{{ topic }}</p>
      <a :href="playURL">Play</a>
    </div>
  </li>
</template>

<script>
export default {
  name: "LRListElement",
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
  },
};
</script>
