import { ApiOptions } from "@/@types/Interface";
import { ref } from "vue";

const cache = (response, url, option: ApiOptions) => {
  if (option.cache && response && !response.error) softCache[url] = response;
};
const softCache = ref<any>({});
const get = (url, option) => {
  const cdata = softCache.value[url];
  return cdata;
};
export default {
  get,
  cache,
};
