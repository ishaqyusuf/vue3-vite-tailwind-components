import { $clientApi } from "@services/client";
import { $dev } from "@/core/utils/functions";
import alert from "@/hooks/alert";
import qs from "qs";
import { ApiReqOptions } from "@/@types/Interface";
import useApiCache from "@/utils/use-api-cache";
const get = async (url, query = {}) => {
  try {
    const { data } = await $clientApi.get(url);
    return data;
  } catch (err) {
    $dev.error(err);
  }
  return null;
};
const create = async (url, form) => {
  try {
    const { data } = await $clientApi.post(`${url}`, form);
    return data;
  } catch (err) {
    $dev.error(err);
  }
  return null;
};
const update = async (url, form) => {
  try {
    const { data } = await $clientApi.patch(`${url}`, form);
    return data;
  } catch (err) {
    $dev.error(err);
  }
  return null;
};
const destroy = async (url) => {
  try {
    const { data } = await $clientApi.delete(`${url}`);
    return data;
  } catch (err) {
    $dev.error(err);
  }
  return null;
};
const toast = (data, options: ApiReqOptions) => {
  if (!data || data.error) {
    if (options.showError) alert.error(options.error ?? data?.error);
  } else {
    options.success && alert.success(options.success);
    if (options.onSuccess) options.onSuccess(data);
  }
};
export default {
  request: async (
    type: "index" | "get" | "create" | "update" | "delete",
    path: any,
    data: any = null,
    options: ApiReqOptions = {}
  ) => {
    let url = [
      "/",
      ...(typeof path === "string" ? path : path.filter(Boolean).join("/")),
      type == "get" && `?${qs.stringify(data)}`,
    ]
      .filter(Boolean)
      .join("");
    let req, response;
    if (options.cache) {
      response = useApiCache.get(url, options);
    }
    if (!response) {
      switch (type) {
        case "get":
          req = get(url);
          break;
        case "create":
          req = create(url, data);
          break;
        case "update":
          req = update(url, data);
          break;
        case "delete":
          req = destroy(url);
          break;
      }
      response = await req;
      useApiCache.cache(response, url, options);
    }
    toast(response, options);
    return response;
  },
  get,
  create,
  update,
  destroy,
  toast,
};
