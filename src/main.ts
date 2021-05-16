import App from "./App.vue";
import "./styles.css";
import router from "./router";
import { ViteSSG } from "vite-ssg";
// import { utils } from "@core/utils/index";
import { clientApiPlugin } from "@services/client";
import { createApp } from "vue";
import Dayjs from "@/hooks/dayjs";

let app = createApp(App);

app
  .use(router)
  .use(Dayjs, { lang: "en" })
  .use((ctx) => {
    Object.values(import.meta.globEager("./modules/*.ts")).map((i) =>
      i.install?.(ctx, router)
    );
  })
  .use(clientApiPlugin)
  // .use(utils)
  .mount("#app");
// export const createApp = ViteSSG(App, { }, (ctx) => {
//   ctx.use(clientAppPlugin);
// });
