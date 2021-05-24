<template>
  <Container class="space-y-4">
    <div class="text-2xl font-bold text-gray-700">Parcels</div>
    <StandardTable
      checkable
      floating-action
      action
      dense
      deletable
      :worker="tableWorker"
      :structure="structure"
      stickyAction
      hide-actions
      hide-checks
      more-action
    >
      <template v-slot:id_date="{ item }">
        <span class="block font-semibold">#{{ item.id }}</span>
        <span class="block">{{ $dayjs.readable(item.created_at) }}</span>
      </template>
      <template v-slot:track_code="{ item, header }">
        <ParcelColumn :item="item" :header="header" />
      </template>
      <template v-slot:recipient="{ item, header }">
        <RecipientColumn :item="item" />
      </template>
      <template v-slot:menu>
        <SimpleMenuItem>Open Parcel</SimpleMenuItem>
        <SimpleMenuItem>Quick Update Parcel</SimpleMenuItem>
        <SimpleMenuItem>Update Tracking</SimpleMenuItem>
        <SimpleMenuItem>Invoice</SimpleMenuItem>
        <SimpleMenuItem>Update Recipient</SimpleMenuItem>
      </template>
    </StandardTable>
    <TableAction
      :worker="tableWorker"
      show
      deletable
      @delete="parcels.deleteParcels(items.filter((item) => item.checked))"
      label
      hasMore
    >
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
import { ref, reactive, toRefs, onMounted, computed, watch } from "vue";
import parcels from "@/use/parcels";
import router from "@/router";
import RecipientColumn from "@/views/Admin/Parcels/RecipientColumn.vue";
import ParcelColumn from "@/views/Admin/Parcels/ParcelColumn.vue";
import table from "@/hooks/table";
import { tableHook } from "@/hooks/table";
import { TableStructure } from "@/@types/Interface";
import PagerInterface from "@/@types/PagerInterface";
export default {
  components: {
    RecipientColumn,
    ParcelColumn,
  },
  props: {},
  setup(props, ctx) {
    onMounted(() => {
      initialize();
    });
    const tableWorker = tableHook();
    tableWorker.initialize([], parcels.transform, {
      // delete: {
      //   // action: ...
      // },
    });

    const data = reactive<{
      items: any[];
      pager: PagerInterface;
    }>({
      items: [],
      pager: {},
    });
    watch(
      () => router.currentRoute.value.query,
      (r) => {
        // tableHook.refreshable(query, getQuery.value, ["pid"]) && initialize();
      }
    );
    const getQuery = computed(() => router.currentRoute.value.query);
    var query: any = {};
    const initialize = async () => {
      const _data = await parcels.fetchMany(router.currentRoute.value.query);
      query = getQuery.value;
      // data.items = parcels.transformAll(_data.items);

      tableWorker.refresh(_data.items);
      data.pager = _data.pager;
    };
    const structure: TableStructure[] = [
      { name: "id_date", title: "#/Date" },
      {
        name: "track_code",
        title: "Parcel",
      },
      {
        name: "recipient",
        title: "Recipient",
      },
      {
        name: "status",
        title: "Status",
      },
    ];

    return {
      ...toRefs(data),
      isLoading: computed(() => parcels.loading.value),
      structure,
      parcels,
      openModal: ref(true),
      tableWorker,
      fine() {
        console.log("......");
      },
    };
  },
};
</script>

<style scoped></style>
