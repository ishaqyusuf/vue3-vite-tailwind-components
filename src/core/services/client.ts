import axios from "axios";
import { axiosConfig } from "./config";
import user from "@/use/user";
import device from "@/hooks/device";
import NProgress from "@/utils/progress";
import qs from "qs";
export const $clientApi = axios.create(axiosConfig);

export const headers = async () => {
  const _headers: any = {};
  const _device: any = await device.get();
  _headers["device"] = JSON.stringify(_device);
  const token = user.getToken();
  if (token) _headers["token"] = token;
  return _headers;
};
export const authentify = async (request) => {
  const _device: any = await device.get();
  request.headers["device"] = JSON.stringify(_device);
  const token = user.getToken();
  if (token) request.headers["token"] = token;
  return request;
};
$clientApi.interceptors.request.use(
  async (request) => {
    NProgress.start();
    request.data && (request.data = qs.stringify(request.data));
    return await authentify(request);
    // return request;
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
