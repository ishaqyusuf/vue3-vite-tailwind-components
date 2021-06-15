import { TableStructure } from "@/@types/Interface";
import useInvoicesApi from "../api/use-invoices-api";
const structure: TableStructure[] = [
  { name: "id_date", title: "Invoice #" },
  { name: "track_code", title: "Client" },
  {
    name: "shipment_route",
    title: "Date Created",
    computed: (item) => item.route.title,
  },
  { name: "parcels", title: "Due Date" },
  { name: "status", title: "Status" },
  { name: "status", title: "Amount" },
];
const transformer = (item, data) => {
  return data;
};
const fetch = async (useList, pager, query = {}) => {
  const data = await useInvoicesApi.index(query);

  useList.refresh(data?.items);
  pager.value = data?.pager;
};
const actions: any = {
  delete: {
    action: async (item) => {
      const data = await useInvoicesApi.delete(item.slug);
    },
  },
};
export default {
  transformer,
  fetch,
  actions,
  structure,
};
