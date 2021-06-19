<template>
  <Table dense :use-list="list" :structure="structure">
    <template v-slot:id="{ item }">
      <span class="">INV-{{ item.id }}</span>
    </template>
    <template v-slot:created_at="{ item }">
      <span class="block">{{ $dayjs.readable(item.created_at) }}</span>
    </template>
    <template v-slot:due_at="{ item }">
      <span class="block">{{
        item.due_at ? $dayjs.readable(item.due_at) : "-"
      }}</span>
    </template>
    <template v-slot:bill_amount="{ item }">
      $ {{ item.bill_amount }}
    </template>
    <template v-slot:status="{ item }">
      <ColorLabel v-if="item.status" :color="item.invoice_color">
        {{ item.status }}
      </ColorLabel>
    </template>
    <template v-slot:client="{ item }">
      <ClientColumn :item="item" :list="list"></ClientColumn>
    </template>
  </Table>
</template>

<script lang="ts">
import useMetaLoader from "@/use/api/use-meta-loader";
import useInvoiceList from "@/use/list/use-invoice-list";
import useList from "@/use/useList";
import { onMounted, ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    const list = useList();
    list.initialize([], useInvoiceList.transformer);
    onMounted(async () => {
      await useMetaLoader.loadInvoiceStatus();
      useInvoiceList.fetch(list, null, {
        with_stat: true,
        db: true,
        per_page: 5,
      });
    });
    return {
      list,
      structure: [
        { name: "id", title: "Invoice #" },
        { name: "client", title: "Client" },
        { name: "status", title: "Status" },
        { name: "bill_amount", title: "Amount", textRight: true },
      ],
    };
  },
};
</script>

<style scoped></style>
