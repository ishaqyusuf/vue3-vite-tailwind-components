import { TableStructure } from "@/@types/Interface";
import useShipmentApi from "../api/use-shipments-api";
const structure: TableStructure[] = [
  { name: "id_date", title: "#/Date" },
  { name: "track_code", title: "Shippings" },
  { name: "parcels", title: "Parcels" },
  { name: "status", title: "Status" },
];
const transformer = (item, data) => {
  data.status_color = item.status == "Active" ? "green" : "red";
  data.track_code_link = {
    name: "shipment",
    params: {
      slug: item.slug,
    },
  };
  data.after_track_code = item.route.title;
  return data;
};
const fetch = async (useList, pager, query = {}) => {
  const data = await useShipmentApi.index(query);
  console.log(data);
  useList.refresh(data?.items);
  pager.value = data?.pager;
};
const actions: any = {
  delete: {
    action: async (item) => {
      const data = await useShipmentApi.delete(item.track_code);
    },
  },
};
export default {
  transformer,
  fetch,
  actions,
  structure,
};
