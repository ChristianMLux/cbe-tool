<template>
  <div class="wrapper">
    <h3>{{ filterHeading }}</h3>
    <input
      v-model="filterRequest"
      @keyup="sendFilterToList"
      :placeholder="placeholder"
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
    placeholder: {
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
