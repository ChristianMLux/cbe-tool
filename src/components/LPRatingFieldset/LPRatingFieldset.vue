<template>
  <fieldset class="lp__fieldset">
    <legend>{{ lpLegend }}</legend>
    <div class="lp__label-wrapper">
      <label
        >1<input
          type="radio"
          :name="lp__labelGroupName"
          :v-model="lp__vModelGroupName"
          value="1"
          :id="lp__idOne"
      /></label>
      <label
        >2<input
          type="radio"
          :name="lp__labelGroupName"
          :v-model="lp__vModelGroupName"
          value="2"
          :id="lp__idTwo"
      /></label>
      <label
        >3<input
          type="radio"
          :name="lp__labelGroupName"
          value="3"
          :id="lp__idThree"
      /></label>
      <label
        >4<input
          type="radio"
          :name="lp__labelGroupName"
          value="4"
          :id="lp__idFour"
      /></label>
      <label
        >5<input
          type="radio"
          :name="lp__labelGroupName"
          value="5"
          :id="lp__idFive"
      /></label>
      <label
        >6<input
          type="radio"
          :name="lp__labelGroupName"
          value="6"
          :id="lp__idSix"
      /></label>
      <label
        >7<input
          type="radio"
          :name="lp__labelGroupName"
          value="7"
          :id="lp__idSeven"
      /></label>
      <label
        >8<input
          type="radio"
          :name="lp__labelGroupName"
          value="8"
          :id="lp__idEight"
      /></label>
      <label
        >9<input
          type="radio"
          :name="lp__labelGroupName"
          value="9"
          :id="lp__idNine"
      /></label>
      <label
        >10<input
          type="radio"
          :name="lp__labelGroupName"
          value="10"
          :id="lp__idTen"
      /></label>
    </div>
    <input
      type="text"
      name="lp__labelGroupName-message"
      class="lp__progress-message-input"
      :id="lp__messageID"
      placeholder="Bitte gebe einen zusätzlichen Kommentar ab"
    />
  </fieldset>
</template>

<script>
export default {
  name: "LPRatingFieldset",
  props: {
    lpLegend: {
      type: String,
      required: true,
    },
    lp__labelGroupName: {
      type: String,
      required: true,
    },
    lp__vModelGroupName: {
      type: String,
    },
    lp__idOne: {
      type: [String, Number],
    },
    lp__idTwo: {
      type: [String, Number],
    },
    lp__idThree: {
      type: [String, Number],
    },
    lp__idFour: {
      type: [String, Number],
    },
    lp__idFive: {
      type: [String, Number],
    },
    lp__idSix: {
      type: [String, Number],
    },
    lp__idSeven: {
      type: [String, Number],
    },
    lp__idEight: {
      type: [String, Number],
    },
    lp__idNine: {
      type: [String, Number],
    },
    lp__idTen: {
      type: [String, Number],
    },
    lp__messageID: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.lp__label-wrapper {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  width: 35vw;
  margin: 0 auto;
}

label {
  display: flex;
  flex-flow: column;
}
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
input {
  accent-color: var(--primary-color);
}
.lp__progress-message-input {
  width: 35vw;
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid var(--secondary-color);
  border-radius: 0.25rem;
  font-size: 0.7em;
}
</style>
