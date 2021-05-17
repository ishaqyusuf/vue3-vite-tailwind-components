import { $clientApi } from "@services/client";
import { $dev } from "@/core/utils/functions";
import userState from "./state";
import alert from "@/hooks/alert";
import router from "@/router";

const home = { name: "home" };

const logout = async () => {
  try {
    await $clientApi.get("/user/logout");
  } catch (error) {
    $dev.error(error);
  }
};
const login = async (
  form,
  redirect: any = { name: "home" },
  authenticate = false
) => {
  try {
    const resp = await $clientApi.post("/user/login", form);
    const { user, token, error, ...rest } = resp.data;
    console.log(rest);
    if (error) alert.register(error, true);
    else !authenticate && alert.register("Welcome back!");
    if (token) {
      userState.initializeUser(token, user);
      if (!authenticate && redirect) router.push(redirect);
    }
    return { error, token, rest };
  } catch (err) {
    $dev.error(err);
  }
  return {};
};
const createAccount = async (form) => {
  try {
    const resp = await $clientApi.post("/user", { data: form });
    const { user, token, error } = resp.data;

    if (error) alert.register(error, true);
    else alert.register("Your account has been created!");
    if (token) {
      userState.initializeUser(token, user);
      router.push({ name: "login" });
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
const validateToken = async (data) => {
  try {
    const response = await $clientApi.post(`user/token/validate`, data);
    const { error, token } = response.data;
    if (error) {
      alert.register(error, true);
      // router.push(home);
    }
    return token;
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
const updatePassword = async (form, token = null) => {
  try {
    const { data } = await $clientApi.patch(`/user/reset_password`, form);
    const { error } = data;
    if (error) alert.register(error, true);
    else {
      alert.register("Password Updated successfully!");
      router.push({
        name: "login",
        query: {
          email: form?.email,
        },
      });
    }
  } catch (error) {
    $dev.error(error);
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
  logout,
  createAccount,
  validate,
  deactivate,
  iforgot,
  validateToken,
  updatePassword,
};
