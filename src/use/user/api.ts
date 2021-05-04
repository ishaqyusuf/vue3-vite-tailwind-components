import { $clientApi } from "@services/client";
import { $dev } from "@/core/utils/functions";
import userState from "./state";
import alert from "@/hooks/alert";
import qs from "qs";
const login = async (form, redirect = { name: "home" }) => {
  try {
    const resp = await $clientApi.post("/user/login", form);
    const { user, token, error } = resp.data;

    if (token) userState.initializeUser(token, user);
    if (error) alert.register(error, true);
    else alert.register("Welcome back!");
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
