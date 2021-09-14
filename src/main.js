import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import CBEMainButton from "./components/CBEMainButton/CBEMainButton.vue";

const app = createApp(App).use(store).use(router);

app.component("cbe-main-btn", CBEMainButton);

app.mount("#app");
