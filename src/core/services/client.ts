import axios from "axios";
import { axiosConfig } from "./config";
import user from "@/use/user";
import device from "@/hooks/device";
import NProgress from "@/utils/progress";
export const $clientApi = axios.create(axiosConfig);
$clientApi.defaults.headers["Content-Type"] =
  "application/x-www-form-urlencoded";
$clientApi.defaults.headers["Accept"] = "application/json";
$clientApi.interceptors.request.use(
  async (request) => {
    NProgress.start();
    request.headers["device"] = await device.get();
    request.headers["Content-Type"] =
      "application/x-www-form-urlencoded; charset=UTF-8;application/json";
    request.headers["Accept"] = "application/json";
    const token = user.getToken();
    if (token) request.headers["auth_token"] = token;
    return request;
  },
  (error) => {
    throw new Error(error);
  }
);

$clientApi.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    console.log(error);
    NProgress.done();
    throw new Error(error);
  }
);

export const clientApiPlugin = {
  install(app) {
    app.config.globalProperties.$clientApi = $clientApi;
  },
};
