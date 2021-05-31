import useSmartApi from "./use-smart-api";
export default {
  index: async (query, options = {}) => {
    const data = await useSmartApi.request(
      "get",
      ["shipments"],
      query,
      options
    );
    return data;
  },
  get: async (id, query = {}, options = {}) => {
    const data = await useSmartApi.get(["shipments", id], query);
    useSmartApi.alert(data, options);
    return data;
  },
  create: async (form, options = {}) => {
    const data = await useSmartApi.create(["shipments"], form);
    useSmartApi.alert(data, options);
    return data;
  },
  delete: async (id, options = {}) => {
    const data = await useSmartApi.delete(["shipments", id]);
    useSmartApi.alert(data, options);
    return data;
  },
};
