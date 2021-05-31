import { $clientApi } from "@/core/services/client";
import { $dev } from "@/core/utils/functions";
import alert from "@/hooks/alert";
import qs from "qs";
const get = async (path: any[], query = {}) => {
  try {
    const { data } = await $clientApi.get(
      `/${path.join("/")}?${qs.stringify(query)}`
    );
    return data;
  } catch (err) {
    $dev.error(err);
  }
  return null;
};
const create = async (path: any[], form) => {
  try {
    const { data } = await $clientApi.post(`/${path.join("/")}`, form);
    return data;
  } catch (err) {
    $dev.error(err);
  }
  return null;
};
const update = async (path: any[], form) => {
  try {
    const { data } = await $clientApi.patch(`/${path.join("/")}`, form);
    return data;
  } catch (err) {
    $dev.error(err);
  }
  return null;
};
const destroy = async (path: any[]) => {
  try {
    const { data } = await $clientApi.delete(`/${path.join("/")}`);
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
    path: any[],
    data,
    options = {}
  ) => {
    let req;
    switch (type) {
      case "get":
        req = get(path, data);
        break;
      case "create":
        req = create(path, data);
        break;
      case "update":
        req = update(path, data);
        break;
      case "delete":
        req = destroy(path);
        break;
    }
    const response = await req;
    toast(response, options);
  },
  get,
  create,
  update,
  destroy,
};
