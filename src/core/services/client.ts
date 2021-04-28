import axios from "axios";
import { axiosConfig } from "./config";
import user from "@/use/user";
import device from "@/hooks/device";
export const $clientApi = axios.create(axiosConfig);
// $clientApi.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

$clientApi.interceptors.request.use(
  async (request) => {
    request.headers["device"] = await device.get();
    if (user.getToken()) request.headers["auth_token"] = user.getToken();
    return request;
  },
  (error) => {
    throw new Error(error);
  }
);

$clientApi.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new Error(error);
  }
);

export const clientApiPlugin = {
  install(app) {
    app.config.globalProperties.$clientApi = $clientApi;
  },
};
