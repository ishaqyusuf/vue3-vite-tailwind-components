import { $clientApi, authentify, headers } from "@/core/services/client";

import { axiosConfig } from "@/core/services/config";
import qs from "qs";
import axios from "axios";

const getDocs = async (query) => {
  const { data } = await $clientApi.get("docs?" + qs.stringify(query));
  return data;
};
const saveDoc = async (file, form, slug = null) => {
  const ax = axios.create({
    baseURL: axiosConfig.baseURL,
    headers: {
      "Content-Type": "multipart/form-data",
      ...(await headers()),
    },
  });
  let fd = new FormData();
  fd.append("file", file);
  if (form) Object.keys(form).map((k) => fd.append(k, JSON.stringify(form[k])));
  const url = ["docs", slug].filter(Boolean).join("/");
  const req = slug ? ax.patch(url, fd) : ax.post(url, fd);

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
