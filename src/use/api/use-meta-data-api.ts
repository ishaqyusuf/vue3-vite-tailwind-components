import { useBaseApi } from "./use-base-api";

export default {
  ...useBaseApi("meta-datas"),
};
export enum MetaDataType {
  DefaultAddress = "default_address",
  PARCEL_STATUS = "parcel_status",
  SHIPMENT_STATUS = "shipment_status",
  COURIERS = "couriers",
  TRACKING_STATUS = "tracking_status",
  TRACKING_NOTE = "tracking_note",
  TRACKING_LOCATION = "tracking_location",
}
