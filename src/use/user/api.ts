import { $clientApi } from "@services/client";
import { $dev } from "@/core/utils/functions";
import userState from "./state";
const login = async (form, redirect = { name: "home" }) => {
  try {
    const resp = await $clientApi.post("/user/login", form);
    console.log(resp);
    const { user, token, error } = resp.data;
    console.log(user);
    if (token) userState.initializeUser(token, user);
    return { error, token };
  } catch (err) {
    $dev.error(err);
  }
  return {};
};
const helloWorld = async () => {
  const resp = await $clientApi.get("/hello");
  return resp.data;
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
  helloWorld,
};
