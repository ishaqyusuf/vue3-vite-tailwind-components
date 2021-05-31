import { TableStructure } from "@/@types/Interface";

const structure: TableStructure[] = [
  { name: "date", title: "Date" },
  { name: "shippings", title: "Shippings" },
  { name: "parcels", title: "Parcels" },
  { name: "status", title: "Status" },
];
const transformer = (item, data) => {
  data.status_color = item.shipment.status == "Active" ? "green" : "red";
  return data;
};
const actions: any = {};
export default {
  transformer,
  actions,
  structure,
};
