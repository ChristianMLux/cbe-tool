<template>
  <header class="cbe__main-header">
    <div class="header-wrapper">
      <img
        class="header-logo"
        alt="Coding Bootcamp Europe Logo"
        src="@/assets/cbe-logo-plain.png"
      />
      <h1 class="big-title">Coding Bootcamp EU - Tool</h1>
      <h1 class="small-title">CBE - Tool</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: "CBEMainHeader",
};
</script>

<style lang="scss" scoped>
.small-title {
  display: none;
}
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
@media screen and (max-width: 975px) {
  h1 {
    font-size: 2rem;
  }
}
@media screen and (max-width: 720px) {
  h1 {
    font-size: 1.8rem;
  }
}
@media screen and (max-width: 650px) {
  .big-title {
    display: none;
  }
  .small-title {
    display: inherit;
    font-size: 1.8rem;
  }
}
</style>
