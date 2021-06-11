import { ApiOptions, ApiReqOptions } from "@/@types/Interface";
import useSmartApi from "./use-smart-api";
export function useBaseApi(path, q = {}, api: ApiOptions = {}) {
  async function create(form, options: ApiReqOptions = {}) {
    const data = await useSmartApi.request(
      "create",
      path,
      { ...q, ...form },
      options
    );
    // useSmartApi.toast(data, options);
    return data;
  }
  async function update(id, form, options: ApiReqOptions = {}) {
    const data = await useSmartApi.request(
      "update",
      [path, id],
      {
        ...q,
        ...form,
      },
      options
    );
    return data;
  }
  return {
    save: async (id, form, options: ApiReqOptions = {}) => {
      return await (id ? update(id, form, options) : create(form, options));
    },
    index: async (query = {}, options: ApiReqOptions = {}) => {
      const data = await useSmartApi.request(
        "get",
        path,
        { ...q, ...query },
        options
      );
      return data;
    },
    get: async (id, query = {}, options: ApiReqOptions = {}) => {
      const data = await useSmartApi.request(
        "get",
        [path, id],
        { ...q, ...query },
        options
      );
      return data;
    },
    create,
    update,
    delete: async (id, options: ApiReqOptions = {}) => {
      const data = await useSmartApi.request("delete", [path, id], options);
      return data;
    },
  };
}
