import { $clientApi } from "@/core/services/client";
import { queuePostFlushCb } from "@vue/runtime-core";

import qs from "qs";

const getDocs = async (query) => {
  const { data } = await $clientApi.get("docs?" + qs.stringify(query));
  return data.items;
};
const saveDoc = async (file, form, slug = null) => {
  let fd = new FormData();
  fd.append("file", file);
  if (form) Object.keys(form).map((k) => fd.append(k, form[k]));
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const url = ["docs", slug].filter(Boolean).join("/");
  const req = slug
    ? $clientApi.patch(url, fd, config)
    : $clientApi.post(url, fd, config);
  const { data } = await req;
  return data;
};
const deletDoc = async (slug) => {
  const { data } = await $clientApi.delete("docs/" + slug);
  return data;
};
export default {
  getDocs,
  saveDoc,
  deletDoc,
};
