<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
  <CBEMainFooter />
</template>
<script>
import CBEMainFooter from "@/components/CBEMainFooter/CBEMainFooter.vue";
export default {
  name: "App",
  components: { CBEMainFooter },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
:root {
  --primary-color: #6a1cc3;
  --secondary-color: #a161e9;
  --background-color: #fafafa;
  --success-color: #a3db33;
  --fail-color: #ed3221;
  --font-color: #121212;
  --placeholder-color: rgba(18, 18, 18, 0.7);
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  line-height: 1.5rem;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
html {
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
  background-color: var(--background-color);
  color: var(--font-color);
  h1 {
    font-size: 2.2rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.8rem;
  }
}
body {
  max-width: 150ch;
  margin: 0 auto;
  min-width: 350px;
}
@media screen and (max-width: 669px) {
  body {
    width: 95%;
  }
}
</style>
