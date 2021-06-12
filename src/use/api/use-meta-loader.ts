import { ref } from "@vue/reactivity";
import { MetaDataType, useMetaApi } from "./use-meta-data-api";

async function getStatusList(type) {
  const { items } = await useMetaApi(type).index({}, { cache: true });
  return items;
}
const parcelStatus = ref<any[]>([]);
const shipmentStatus = ref<any[]>([]);
const invoiceStatus = ref<any[]>([]);
export default {
  parcelStatus,
  shipmentStatus,
  invoiceStatus,
  loadParcelStatus: async () => {
    parcelStatus.value = await getStatusList(MetaDataType.PARCEL_STATUS);
  },
  loadShipmentStatus: async () => {
    shipmentStatus.value = await getStatusList(MetaDataType.SHIPMENT_STATUS);
  },
  loadInvoiceStatus: async () => {
    invoiceStatus.value = await getStatusList(MetaDataType.INVOICE_STATUS);
  },
  units: async () => {
    const { data } = await useMetaApi(MetaDataType.UNIT_SYSTEM).index(
      { single: true },
      {
        cache: true,
      }
    );
    return {
      currency: data.primary_currency,
      ...data,
    };
  },
};
