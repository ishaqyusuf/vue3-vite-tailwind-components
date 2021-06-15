<template>
  <Container class="space-y-4">
    <div class="inline-flex justify-between w-full items-center">
      <div class="inline-flex items-center space-x-2">
        <CardTitle>Invoices</CardTitle>
        <Menu rtl>
          <Btn
            tertiary
            class="bg-blue-100 rounded-lg text-blue-700 font-semibold"
          >
            <span>All Invoices</span>
            <i-mdi-chevron-down />
          </Btn>
          <template v-slot:items>
            <SimpleMenuItem>All Invoices</SimpleMenuItem>
            <SimpleMenuItem>This Month</SimpleMenuItem>
            <SimpleMenuItem>Past 3 Months</SimpleMenuItem>
            <SimpleMenuItem>Past 6 Months</SimpleMenuItem>
            <SimpleMenuItem>This Year</SimpleMenuItem>
            <SimpleMenuItem>Date Range</SimpleMenuItem>
            <SimpleMenuItem>By Client</SimpleMenuItem>
            <SimpleMenuItem>By Shipment</SimpleMenuItem>
          </template>
        </Menu>
      </div>
      <div class="inline-flex space-x-2">
        <!-- <Btn secondary>
          <i-mdi-plus />
          <span>New Route</span>
        </Btn> -->
        <ShipmentFormDialog>
          <template #btn="{ open }">
            <Btn @click="open(null, listr)">
              <i-mdi-plus />
              <span>New Invoice</span>
            </Btn>
          </template>
        </ShipmentFormDialog>
      </div>
    </div>
    <SummaryCard />
    <Table
      checkable
      action
      hide-actions
      dense
      deletable
      :use-list="listr"
      hide-checks
      more-action
      :structure="structure"
    >
      <template v-slot:id_date="{ item }">
        <span class="block font-semibold">#{{ item.id }}</span>
        <span class="block">{{ $dayjs.readable(item.created_at) }}</span>
      </template>
      <template v-slot:status="{ item }">
        <span
          v-if="item.status"
          class="rounded-lg px-1 font-medium"
          :class="[
            'text-' + item.status_color + '-700',
            'bg-' + item.status_color + '-50',
          ]"
          >{{ item.status }}</span
        >
      </template>
      <template v-slot:menu-items="{ item }">
        <MenuLinkItem :to="item.to">
          <i-mdi-open-in-app class="mr-3" />
          Open Parcel</MenuLinkItem
        >
        <MenuItem @click="listr.execute('openParcelForm', item)">
          <i-mdi-package-variant class="mr-3" />
          Update Parcel</MenuItem
        >
        <MenuItem @click="listr.execute('updateTracking', item)">
          <i-mdi-map-marker-plus-outline class="mr-3" />
          Update Tracking</MenuItem
        >
        <MenuLinkItem to="{}">
          <i-mdi-receipt class="mr-3" />
          Invoice</MenuLinkItem
        >
        <MenuItem @click="listr.execute('openLabel', item)">
          <i-mdi-label-variant-outline class="mr-3" />
          Label</MenuItem
        >
        <MenuItem @click="listr.execute('selectRecipient', item)">
          <i-mdi-account-plus-outline class="mr-3" />
          Update Recipient</MenuItem
        >
      </template>
    </Table>

    <TableAction :use-list="listr" show deletable label hasMore>
      <!-- @delete="parcels.deleteParcels(items.filter((item) => item.checked))" -->
      <!-- @delete="deleteMany" @print="printMany" @edit="editMany" -->
      <template v-slot:menu>
        <MenuLinkItem>Open Parcel</MenuLinkItem>
        <MenuLinkItem>Quick Update Parcel</MenuLinkItem>
        <MenuLinkItem>Update Tracking</MenuLinkItem>
        <MenuLinkItem>Invoice</MenuLinkItem>
        <MenuLinkItem>Update Recipient</MenuLinkItem>
      </template>
      <template v-slot:more>
        <Btn dark rounded large color="gray-700">
          <i-mdi-archive-outline />
          <span>Archive</span>
        </Btn>
      </template>
    </TableAction>
    <Pager :data="pager" simple />
  </Container>
</template>

<script lang="ts">
import useInvoiceList from "@/use/list/use-invoice-list";
import useList from "@/use/useList";
import { onMounted, ref } from "vue";
import ShipmentFormDialog from "@/views/Admin/Shipment/Components/ShipmentFormDialog.vue";
import useMetaLoader from "@/use/api/use-meta-loader";
import SummaryCard from "./SummaryCard.vue";
export default {
  components: {
    ShipmentFormDialog,
    SummaryCard,
  },
  props: {},
  setup(props, { emit }) {
    const listr = useList();
    listr.initialize([], useInvoiceList.transformer, useInvoiceList.actions);
    const pager = ref({});
    useInvoiceList.fetch(listr, pager);
    const shipmentForm = ref({});
    onMounted(async () => {
      await useMetaLoader.loadShipmentStatus();
    });
    return {
      shipmentForm,
      pager,
      listr,
      ...useInvoiceList,
    };
  },
};
</script>

<style scoped></style>
