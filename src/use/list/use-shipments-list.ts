import { TableStructure } from "@/@types/Interface";
import { useShipmentsApi } from "../api/use-api";
const structure: TableStructure[] = [
  { name: "id_date", title: "#/Date" },
  { name: "track_code", title: "Shipment" },
  {
    name: "shipment_route",
    title: "Route",
    computed: (item) => item.route.title,
  },
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
  if (item.route)
    data.shipment_route_link = {
      name: "shipment-route",
      params: {
        slug: item.route.slug,
      },
    };
  // data.after_track_code = item.route.title;
  return data;
};
const fetch = async (useList, pager, query = {}) => {
  const data = await useShipmentsApi.index(query);

  useList.refresh(data?.items);
  if (pager) pager.value = data?.pager;
};
const actions: any = {
  delete: {
    action: async (item) => {
      const data = await useShipmentsApi.delete(item.slug);
    },
  },
};
export default {
  transformer,
  fetch,
  actions,
  structure,
};
