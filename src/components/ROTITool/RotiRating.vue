<template>
  <fieldset class="roti__fieldset">
    <legend>{{ rotiLegend }}</legend>
    <div class="roti__label-wrapper rating-fieldset">
      <label class="rating-fieldset__grouplabel"
        >1<input
          type="radio"
          :name="roti__labelGroupName"
          @click="getRating"
          :v-model="roti__vModelGroupName"
          value="1"
          :id="roti__idOne"
      /></label>
      <label class="rating-fieldset__grouplabel"
        >2<input
          type="radio"
          :name="roti__labelGroupName"
          @click="getRating"
          :v-model="roti__vModelGroupName"
          value="2"
          :id="roti__idTwo"
      /></label>
      <label
        class="rating-fieldset__grouplabel rating-fieldset__grouplabel--red"
        >3<input
          type="radio"
          :name="roti__labelGroupName"
          @click="getRating"
          :v-model="roti__vModelGroupName"
          value="3"
          :id="roti__idThree"
      /></label>
      <label
        >4<input
          type="radio"
          :name="roti__labelGroupName"
          @click="getRating"
          :v-model="roti__vModelGroupName"
          value="4"
          :id="roti__idFour"
      /></label>
      <label
        >5<input
          type="radio"
          :name="roti__labelGroupName"
          @click="getRating"
          :v-model="roti__vModelGroupName"
          value="5"
          :id="roti__idFive"
      /></label>
    </div>
    <input
      type="text"
      name="roti__labelGroupName-message"
      class="roti__progress-message-input"
      :v-model="rotiMessage"
      :id="roti__messageID"
      @keydown="getRotiMessage"
      placeholder="Bitte gebe einen zusätzlichen Kommentar ab"
    />
    <cbe-main-btn
      id="send-roti-btn"
      class="margin-left"
      buttonClass="secondary"
      data-cy="send-button"
      @click="$emit('initRoti')"
      >SENDEN
    </cbe-main-btn>
  </fieldset>
</template>

<script>
export default {
  name: "rotiRatingFieldset",
  props: {
    rotiLegend: {
      type: String,
      required: true,
    },
    roti__labelGroupName: {
      type: String,
      required: true,
    },
    roti__vModelGroupName: {
      type: String,
    },
    roti__idOne: {
      type: [String, Number],
    },
    roti__idTwo: {
      type: [String, Number],
    },
    roti__idThree: {
      type: [String, Number],
    },
    roti__idFour: {
      type: [String, Number],
    },
    roti__idFive: {
      type: [String, Number],
    },
    roti__messageID: {
      type: String,
    },
    rotiMessage: {
      type: String,
    },
  },
  emits: ["initRoti", "getRating", "getRotiMessage"],
  methods: {
    getRating() {
      this.$emit("getRating", event.target.value);
    },
    getRotiMessage() {
      this.$emit("getRotiMessage", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.roti__fieldset {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid var(--primary-color);
}
.roti__label-wrapper {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  width: 45vw;
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
.roti__progress-message-input {
  width: 45vw;
  height: 10rem;
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid var(--secondary-color);
  border-radius: 0.25rem;
  font-size: 0.7em;
}
</style>
