import { ApiReqOptions } from "@/@types/Interface";
import { useBaseApi } from "./use-base-api";

export function useMetaApi(type: MetaDataType) {
  const uba = useBaseApi("meta-datas", { type });
  return {
    ...uba,
    save: async (id, form, options: ApiReqOptions = {}) => {
      return await uba.save(
        id,
        {
          ...form,
          data: { ...form.data, ...{ type } },
        },
        options
      );
    },
  };
}
export default {
  ...useBaseApi("meta-datas"),
};
export enum MetaDataType {
  DefaultAddress = "default_address",
  PARCEL_STATUS = "parcel_status",
  SHIPMENT_STATUS = "shipment_status",
  INVOICE_STATUS = "invoice_status",
  COURIERS = "couriers",
  TRACKING_STATUS = "tracking_status",
  TRACKING_NOTE = "tracking_note",
  TRACKING_LOCATION = "tracking_location",
  UNIT_SYSTEM = "unit_system",
  DEFAULT_INVOICE = "default_invoice",
}
