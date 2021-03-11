import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import "./styles.css";
import router from "./router";

let app = createApp(App);

app.use(router);

const globs = import.meta.glob("./components/ui/*.vue");
Object.keys(globs).forEach((key) => {
  const name = ["V", key.split("/").pop()?.split(".")[0]].join("");
  app.component(
    name,
    defineAsyncComponent(() => globs[key]())
  );
});

app.mount("#app");
