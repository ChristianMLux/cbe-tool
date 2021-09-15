<template>
  <section>
    <div class="home__wrapper">
      <h2 class="home__welcome-heading">Willkommen bei Coding-Bootcamps-EU!</h2>
      <p class="home__welcome-message-loggedOut" v-show="!isUserLoggedIn">
        Bitte logge dich mit deinem GitHub Profil ein um dieses Tool nutzen zu
        können!
      </p>
      <p class="home__welcome-message-loggedIn" v-show="isUserLoggedIn">
        Du bist nun eingeloggt und kannst alle Funktionen nutzen. Viel Spaß!
      </p>
      <CBEUserLogin />
    </div>
  </section>
</template>

<script>
import CBEUserLogin from "@/components/CBEUserLogin/CBEUserLogin.vue";

import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "Home",
  components: { CBEUserLogin },
  setup() {
    const store = useStore();

    const isUserLoggedIn = computed(() => store.state.isUserLoggedIn);

    return {
      isUserLoggedIn,
    };
  },
};
</script>
