<template>
  <button :class="buttonClass"><slot /></button>
</template>

<script>
//  implementation-line: <main-button class="[class-name]">testen</main-button>
export default {
  name: "CBEMainButton",
  props: {
    buttonClass: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.primary {
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
.secondary {
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

.secondary:focus,
.primary:focus {
  outline: none;
  border: 2.5px solid var(--success-color);
}
@media screen and (max-width: 900px) {
  .secondary {
    font-size: 0.75rem;
  }

  .primary {
    font-size: 0.75rem;
  }
}

@media screen and (max-width: 720px) {
  .secondary {
    font-size: 0.55rem;
    line-height: 1rem;
    margin: 0.2rem;
  }

  .primary {
    font-size: 0.55rem;
    line-height: 1rem;
    margin: 0.2rem;
  }
}
</style>
