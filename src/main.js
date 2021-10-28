import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//registerServicdeWorker deinstallieren
import CBEMainButton from "./components/CBEMainButton/CBEMainButton.vue";
try {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
} catch (e) {
  console.error("shit happens: ", e);
}

const app = createApp(App).use(store).use(router);
if (process.env.NODE_ENV) {
  require("dotenv").config();
}

app.component("cbe-main-btn", CBEMainButton);

app.mount("#app");
