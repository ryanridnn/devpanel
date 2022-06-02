import { createApp } from "vue";
import App from "./App.vue";
import "normalize.css";
import "./styles/global.scss";

import router from "./routes/router";
import store from "./store";

createApp(App).use(router).use(store).mount("#app");
