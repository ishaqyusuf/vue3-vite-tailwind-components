import { ShipmentOverview } from "@/@types/Interface";
import useSmartApi from "./use-smart-api";
export default {
  index: async (query, options = {}) => {
    const data = await useSmartApi.request("get", "shipments", query, options);
    return data;
  },
  get: async (id, query = {}, options = {}) => {
    const data = await useSmartApi.request(
      "get",
      ["shipments", id],
      query,
      options
    );
    return data; // as ShipmentOverview;
  },
  create: async (form, options = {}) => {
    const data = await useSmartApi.request(
      "create",
      "shipments",
      form,
      options
    );
    // useSmartApi.toast(data, options);
    return data;
  },
  delete: async (id, options = {}) => {
    const data = await useSmartApi.request("delete", ["shipments", id]);
    return data;
  },
  update: async (id, form, options = {}) => {
    const data = await useSmartApi.request("update", ["shipments", id], form);
    return data;
  },
};
