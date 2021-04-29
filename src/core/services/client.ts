import axios from "axios";
import { axiosConfig } from "./config";
import user from "@/use/user";
import device from "@/hooks/device";
import NProgress from "@/utils/progress";
export const $clientApi = axios.create(axiosConfig);
// $clientApi.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

$clientApi.interceptors.request.use(
  async (request) => {
    request.headers["device"] = await device.get();
    const token = user.getToken();
    if (token) request.headers["auth_token"] = token;
    NProgress.start();
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
    NProgress.done();
    throw new Error(error);
  }
);

export const clientApiPlugin = {
  install(app) {
    app.config.globalProperties.$clientApi = $clientApi;
  },
};
