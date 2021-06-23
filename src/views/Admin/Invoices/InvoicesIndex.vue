<template>
  <Container class="">
    <div class="inline-flex justify-between w-full items-center">
      <div class="inline-flex items-center space-x-2">
        <CardTitle dense>Invoices</CardTitle>
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
            <Btn @click="open(null, list)">
              <i-mdi-plus />
              <span>New Invoice</span>
            </Btn>
          </template>
        </ShipmentFormDialog>
      </div>
    </div>
    <SummaryCard class="mb-4" />
    <Table
      checkable
      action
      hide-actions
      dense
      deletable
      :use-list="list"
      hide-checks
      more-action
      :structure="structure"
    >
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
        <!-- <span
          v-if="item.status"
          class="rounded-lg px-1 font-medium"
          :class="[
            'text-' + item.status_color + '-700',
            'bg-' + item.status_color + '-50',
          ]"
          >{{ item.status }}</span
        > -->
      </template>
      <template v-slot:client="{ item }">
        <ClientColumn :item="item" :list="list"></ClientColumn>
      </template>
      <template v-slot:menu-items="{ item }">
        <!-- <MenuLinkItem :to="item.to">
          <i-mdi-open-in-app class="mr-3" />
          Open Parcel</MenuLinkItem
        >
        <MenuItem @click="list.execute('openParcelForm', item)">
          <i-mdi-package-variant class="mr-3" />
          Update Parcel</MenuItem
        >
        <MenuItem @click="list.execute('updateTracking', item)">
          <i-mdi-map-marker-plus-outline class="mr-3" />
          Update Tracking</MenuItem
        >
        <MenuLinkItem to="{}">
          <i-mdi-receipt class="mr-3" />
          Invoice</MenuLinkItem
        >
        <MenuItem @click="list.execute('openLabel', item)">
          <i-mdi-label-variant-outline class="mr-3" />
          Label</MenuItem
        >
        <MenuItem @click="list.execute('selectClient', item)">
          <i-mdi-account-plus-outline class="mr-3" />
          Update Recipient</MenuItem
        > -->
      </template>
    </Table>

    <TableAction :use-list="list" show deletable label hasMore>
      <template v-slot:menu>
        <!-- <MenuLinkItem>Open Parcel</MenuLinkItem>
        <MenuLinkItem>Quick Update Parcel</MenuLinkItem>
        <MenuLinkItem>Update Tracking</MenuLinkItem>
        <MenuLinkItem>Invoice</MenuLinkItem>
        <MenuLinkItem>Update Recipient</MenuLinkItem> -->
      </template>
      <template v-slot:more>
        <Btn dark rounded large color="black">
          <i-mdi-archive-outline />
          <span>Archive</span>
        </Btn>
      </template>
    </TableAction>
    <Pager :data="pager" simple />
    <UserList ref="userls" title="Select Client"></UserList>
  </Container>
</template>

<script lang="ts">
import useInvoiceList from "@/use/list/use-invoice-list";
import useList from "@/use/useList";
import { onMounted, ref } from "vue";
import ShipmentFormDialog from "@/views/Admin/Shipment/Components/ShipmentFormDialog.vue";
import useMetaLoader from "@/use/api/use-meta-loader";
import SummaryCard from "./InvoiceSummaryCard.vue";
import useInvoicesData from "./use-invoices-data";
import UserList from "../Components/UserList.vue";
import ClientColumn from "@/views/Admin/Parcels/ClientColumn.vue";
import useInvoiceListActions from "./use-invoice-list-actions";
export default {
  components: {
    ClientColumn,
    ShipmentFormDialog,
    SummaryCard,
    UserList,
  },
  props: {},
  setup(props, { emit }) {
    const list = useList();
    const userls = ref();
    list.initialize(
      [],
      useInvoiceList.transformer,
      useInvoiceListActions({ userls, list })
    );
    const pager = ref({});

    const shipmentForm = ref({});

    onMounted(async () => {
      await useMetaLoader.loadInvoiceStatus();
      useInvoiceList.fetch(
        list,
        pager,
        {
          with_stat: true,
        },
        {
          onSuccess: (result) => {
            useInvoicesData.refreshSummary(result);
          },
        }
      );
    });
    return {
      userls,
      shipmentForm,
      pager,
      list,
      ...useInvoiceList,
    };
  },
};
</script>

<style scoped></style>
