<template>
  <fieldset class="lp__fieldset">
    <legend>{{ lpLegend }}</legend>
    <label>
      <textarea
        class="lp__textarea"
        :id="lp__areaID"
        :name="lp__areaName"
        :placeholder="lp__placeholder"
      ></textarea>
    </label>
  </fieldset>
</template>
<script>
export default {
  name: "LPCommentFieldset",
  props: {
    lpLegend: {
      type: String,
      required: true,
    },
    lp__areaID: {
      type: String,
    },
    lp__areaName: {
      type: String,
    },
    lp__placeholder: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
legend,
label {
  font-size: 0.8em;
}
legend {
  text-align: left;
  padding: 0 0.25rem;
  margin: 0.5rem;
  border: 0.25px dotted var(--secondary-color);
  border-radius: 0.25rem;
}
.lp__textarea {
  font-family: "Open Sans", sans-serif;
  font-size: 0.9em;
  outline: none !important;
  border: none !important;
  border: 1px solid var(--secondary-color) !important;
  border-radius: 0.25rem !important;
  resize: none !important;
  width: 85vw;
  min-height: 4rem;
  &:focus {
    border: 1px solid var(--success-color) !important;
  }
}
</style>
