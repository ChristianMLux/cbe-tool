<template>
  <section>
    <p>
      Du bist ausgeloggt. Bitte logge dich wieder ein, falls du die Funktionen
      des Tools nutzen möchtest.
    </p>
    <CBEUserLogin />
  </section>
</template>

<script>
import CBEUserLogin from "@/components/CBEUserLogin/CBEUserLogin.vue";
export default {
  name: "LoggedOut",
  components: {
    CBEUserLogin,
  },
};
</script>
