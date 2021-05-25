import { $clientApi } from "@/core/services/client";
import qs from "qs";

const getUsers = async (query = {}) => {
  const { data } = await $clientApi.get(`/usrs?${qs.stringify(query)}`);
  return data;
};
export default {
  getUsers,
};
