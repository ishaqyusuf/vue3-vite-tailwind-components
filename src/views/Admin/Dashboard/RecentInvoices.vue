<template>
  <Card>
    <Table dense vintage :use-list="list" :structure="structure">
      <template v-slot:id="{ item }">
        <span class="font-semibold">INV-{{ item.id }}</span>
        <span class="block">{{ $dayjs.readable(item.created_at) }}</span>
      </template>
      <template v-slot:created_at="{ item }"> </template>
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
        <ClientColumn readonly :item="item" :list="list">
          <template #empty="{ item }">
            <router-link :to="{ name: 'invoices' }">
              <Btn dense secondary>Add Client</Btn>
            </router-link>
          </template>
        </ClientColumn>
      </template>
    </Table></Card
  >
</template>

<script lang="ts">
import useMetaLoader from "@/use/api/use-meta-loader";
import useInvoiceList from "@/use/list/use-invoice-list";
import useList from "@/use/useList";
import { onMounted, ref } from "vue";
import ClientColumn from "@/views/Admin/Parcels/ClientColumn.vue";
export default {
  components: { ClientColumn },
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
