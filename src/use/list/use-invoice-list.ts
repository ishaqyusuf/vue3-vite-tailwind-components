import { ApiReqOptions, TableStructure } from "@/@types/Interface";
import { useInvoicesApi } from "../api/use-api";
import useMetaLoader from "../api/use-meta-loader";
import useStatusColor from "../data/use-status-color";
const structure: TableStructure[] = [
  { name: "id", title: "Invoice #" },
  {
    name: "created_at",
    title: "Date Created",
    // computed: (item) => item.route.title,
  },
  { name: "client", title: "Client" },
  { name: "due_at", title: "Due Date" },
  { name: "status", title: "Status" },
  { name: "bill_amount", title: "Amount", textRight: true },
];
const transformer = (item, data) => {
  data.invoice_color = useStatusColor.getColor(
    item.status,
    useMetaLoader.invoiceStatus.value
  );
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
