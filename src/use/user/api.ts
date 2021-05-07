import { $clientApi } from "@services/client";
import { $dev } from "@/core/utils/functions";
import userState from "./state";
import alert from "@/hooks/alert";
import qs from "qs";
import router from "@/router";
const login = async (form, redirect = { name: "home" }) => {
  try {
    const resp = await $clientApi.post("/user/login", form);
    const { user, token, error } = resp.data;

    if (error) alert.register(error, true);
    else alert.register("Welcome back!");
    if (token) {
      userState.initializeUser(token, user);
      router.push(redirect);
    }
    return { error, token };
  } catch (err) {
    $dev.error(err);
  }
  return {};
};
const iforgot = async (email) => {
  try {
    const response = await $clientApi.get(`user/iforgot/${email}`);

    const { error } = response.data;

    if (error) alert.register(error, true);
    else alert.register("We have sent you a verification email");
    return error;
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
  iforgot,
};
