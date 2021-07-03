import { IWebInterface } from "@/@types/IWebInterface";
import { ref } from "vue";
import websites from "./use-websites";

const website = ref<IWebInterface>({});
const initialize = (): Boolean => {
  var pageUrl = window.location.toString();
  var website = websites.find((w) => pageUrl.includes(w.url));
  return website != null;
};
export default {
  initialize,
  website,
};
