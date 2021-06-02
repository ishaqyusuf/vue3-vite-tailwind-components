import useSmartApi from "./use-smart-api";
export function useBaseApi(path) {
  return {
    index: async (query, options = {}) => {
      const data = await useSmartApi.request("get", path, query, options);
      return data;
    },
    get: async (id, query = {}, options = {}) => {
      const data = await useSmartApi.request("get", [path, id], query, options);
      return data; // as ShipmentOverview;
    },
    create: async (form, options = {}) => {
      const data = await useSmartApi.request("create", path, form, options);
      // useSmartApi.toast(data, options);
      return data;
    },
    delete: async (id, options = {}) => {
      const data = await useSmartApi.request("delete", [path, id]);
      return data;
    },
    update: async (id, form, options = {}) => {
      const data = await useSmartApi.request("update", [path, id], form);
      return data;
    },
  };
}
