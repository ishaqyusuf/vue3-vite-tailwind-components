import { $clientApi } from "@/core/services/client";
import qs from "qs";
export default {
  async get(type: SiteDataType, query: any = {}) {
    return new Promise<any>((resolve, reject) => {
      query.slug = type;
      $clientApi
        .get(`/site_data?${qs.stringify(query)}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve({ error: "Server error" });
        });
    });
  },
  async save(data) {
    return new Promise((resolve, reject) => {
      const url = `/site_data?${data.id}`;
      data.title = data.type.replaceAll("_", " ");
      let req = data.id ? $clientApi.patch(url) : $clientApi.post(url);
      return new Promise((resolve, reject) => {
        req
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            resolve(null);
          });
      });
    });
  },
};

export type SiteDataType =
  | "parcel_data"
  | "invoice_config"
  | "parcel_tracking"
  | "parcel_status"
  | "shipment_status"
  | "label_config";
