import { ApiReqOptions, TableStructure } from "@/@types/Interface";
import useInvoicesApi from "../api/use-invoices-api";
const structure: TableStructure[] = [
  { name: "id", title: "Invoice #" },
  { name: "client", title: "Client" },
  {
    name: "created_at",
    title: "Date Created",
    // computed: (item) => item.route.title,
  },
  { name: "due_at", title: "Due Date" },
  { name: "status", title: "Status" },
  { name: "bill_amount", title: "Amount" },
];
const transformer = (item, data) => {
  return data;
};
const fetch = async (useList, pager, query = {}, opts: ApiReqOptions = {}) => {
  const data = await useInvoicesApi.index(query, opts);

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
