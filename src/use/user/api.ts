import { $clientApi } from "@services/client";
import { $dev } from "@/core/utils/functions";
import userState from "./state";
const login = async (form, redirect = { name: "home" }) => {
  try {
    const { user, token, error } = (
      await $clientApi.post("/user/login", form)
    ).data;
    if (token) userState.initializeUser(token, user);
    return { error, token };
  } catch (err) {
    $dev.error(err);
  }
  return {};
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
