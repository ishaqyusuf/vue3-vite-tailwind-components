import { $clientApi } from "@services/client";
import { $dev } from "@/core/utils/functions";
import alert from "@/hooks/alert";
import qs from "qs";
const get = async (url, query = {}) => {
  try {
    const { data } = await $clientApi.get(`${url}?${qs.stringify(query)}`);
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
const toast = (data, options) => {
  if (data?.error && options.showError) {
    alert.error(data.error);
  } else {
    options.success && alert.success(options.success);
  }
  if (!data && options.error) alert.error(options.error);
};
export default {
  request: async (
    type: "index" | "get" | "create" | "update" | "delete",
    path: any,
    data: any = null,
    options = {}
  ) => {
    let url = ["/", ...(typeof path === "string" ? path : path.join("/"))].join(
      ""
    );
    let req;
    switch (type) {
      case "get":
        req = get(url, data);
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
    const response = await req;
    toast(response, options);
    return response;
  },
  get,
  create,
  update,
  destroy,
  toast,
};
