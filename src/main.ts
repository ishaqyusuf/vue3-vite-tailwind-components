import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import "./styles.css";
import router from "./router";

// import { utils } from "@utils/index";
import { clientApiPlugin } from "@services/client";
let app = createApp(App);

app
  .use(router)
  .use(clientApiPlugin)
  // .use(utils)
  .mount("#app");
