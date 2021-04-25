import { $clientApi } from "@services/client";
import { $dev } from "@/core/utils/functions";
const login = async (form) => {
  try {
    const { data } = await $clientApi.post("/user", form);
    return data;
  } catch (err) {
    $dev.error(err);
  }
};
const validate = async (token) => {
  try {
    const { data } = await $clientApi.get(`/user/validate/${token}`);
    return data;
  } catch (err) {
    $dev.error(err);
  }
};
const deactivate = async (password) => {
  try {
    const { data } = await $clientApi.get(`/deactivate/${password}`);
    return data;
  } catch (err) {
    $dev.error(err);
  }
};

export default {
  login,
  validate,
  deactivate,
};
