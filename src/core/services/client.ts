import axios from "axios";
import { axiosConfig } from "./config";

export const $clientApi = axios.create(axiosConfig);
// $clientApi.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

$clientApi.interceptors.request.use(
  (config) => config,
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
