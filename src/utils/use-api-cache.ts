import { ApiReqOptions } from "@/@types/Interface";
import { ref } from "vue";
import localStorage from "./localStorage";

const cache = (response, url, option: ApiReqOptions) => {
  if (option.cache && response && !response.error) {
    if (!option.deepCache) softCache[url] = response;
    else localStorage.set(url, response);
  }
};
const softCache = ref<any>({});
const get = (url, option: ApiReqOptions) => {
  const cdata = option.deepCache ? localStorage.get(url) : softCache.value[url];
  return cdata;
};
export default {
  get,
  cache,
};
