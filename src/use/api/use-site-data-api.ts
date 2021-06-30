import { useBaseApi } from "./use-base-api";

export default {
  ...useBaseApi("site_data"),
};

export enum SiteData {
  ParcelData = "parcel_data",
  ParcelClientData = "parcel_client_data",
  InvoiceConfig = "invoice_config",
  ParcelTracking = "parcel_tracking",
  LabelConfig = "label_config",
}
