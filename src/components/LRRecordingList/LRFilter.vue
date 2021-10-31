<template>
  <div class="wrapper">
    <h3>{{ filterHeading }}</h3>
    <input
      v-model="filterRequest"
      @keyup="sendFilterToList"
      placeholder="Gib den Titel oder Wörter aus dem Titel ein.."
    />
  </div>
</template>

<script>
export default {
  name: "LRFilter",
  emits: ["filter-result"],
  props: {
    filterHeading: {
      type: String,
    },
  },
  data() {
    return {
      filterRequest: "",
    };
  },
  methods: {
    sendFilterToList() {
      this.$emit("filter-result", this.filterRequest);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: grid;
  input {
    min-height: 1.5rem;
  }
}
</style>
