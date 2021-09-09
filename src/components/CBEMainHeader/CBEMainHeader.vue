<template>
  <header class="cbe__main-header">
    <div class="header-wrapper">
      <img
        class="header-logo"
        alt="Coding Bootcamp Europe Logo"
        src="@/assets/cbe-logo-plain.png"
      />
      <h1>Coding Bootcamp EU - Tool</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: "CBEMainHeader",
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  align-items: center;
  margin-left: 2.54rem;
}
.header-logo {
  height: 3rem;
}
h1 {
  margin-left: 2rem;
}
</style>
