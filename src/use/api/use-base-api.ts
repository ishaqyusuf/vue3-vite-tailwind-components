import { ApiOptions } from "@/@types/Interface";
import useSmartApi from "./use-smart-api";
export function useBaseApi(path) {
  async function create(form, options: ApiOptions = {}) {
    const data = await useSmartApi.request("create", path, form, options);
    // useSmartApi.toast(data, options);
    return data;
  }
  async function update(id, form, options: ApiOptions = {}) {
    const data = await useSmartApi.request("update", [path, id], form);
    return data;
  }
  return {
    save: async (id, form, options: ApiOptions = {}) => {
      return await (id ? update(id, form, options) : create(form, options));
    },
    index: async (query, options: ApiOptions = {}) => {
      const data = await useSmartApi.request("get", path, query, options);
      return data;
    },
    get: async (id, query = {}, options: ApiOptions = {}) => {
      const data = await useSmartApi.request("get", [path, id], query, options);
      return data; // as ShipmentOverview;
    },
    create,
    update,
    delete: async (id, options: ApiOptions = {}) => {
      const data = await useSmartApi.request("delete", [path, id]);
      return data;
    },
  };
}
