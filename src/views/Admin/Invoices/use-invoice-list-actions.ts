import { useInvoicesApi } from "@/use/api/use-api";
export default function useInvoiceListActions({ userls }) {
  return {
    selectClient: async (item) => {
      userls.value.open().then(async (user) => {
        await useInvoicesApi.update(item.id, {
          data: {
            user_id: user.id,
          },
        });
      });
    },
  };
}
