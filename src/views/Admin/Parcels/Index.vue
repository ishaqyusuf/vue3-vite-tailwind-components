<template>
  <Container class="space-y-4">
    <div class="text-2xl font-bold text-gray-700">{{ title }}</div>

    <StandardTable
      checkable
      floating-action
      action
      hide-actions
      dense
      deletable
      :worker="tableWorker"
      :structure="structure"
      stickyAction
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
        <RecipientColumn :item="item" :list="tableWorker" />
      </template>
      <template v-slot:more-actions="{ item, header }">
        <Btn dense large icon @click="tableWorker.execute('openLabel', item)">
          <i-mdi-label-outline />
        </Btn>
      </template>
      <template v-slot:menu-items="{ item }">
        <MenuLinkItem :to="item.to">Open Parcel</MenuLinkItem>
        <MenuItem @click="tableWorker.execute('parcelForm', item)"
          >Quick Update Parcel</MenuItem
        >
        <MenuItem @click="tableWorker.execute('updateTracking', item)"
          >Update Tracking</MenuItem
        >
        <MenuLinkItem>Invoice</MenuLinkItem>
        <MenuItem @click="tableWorker.execute('openLabel', item)"
          >Label</MenuItem
        >
        <MenuItem @click="tableWorker.execute('selectRecipient', item)"
          >Update Recipient</MenuItem
        >
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
    <LabelViewer ref="labelRef"></LabelViewer>
    <UserList ref="userls" title="Select Client"></UserList>

    <EditTracking
      :parcels-hook="tableWorker"
      ref="trackingEditor"
    ></EditTracking>
    <ParcelFormPrompt
      :ls-hook="tableWorker"
      ref="parcelForm"
    ></ParcelFormPrompt>
  </Container>
</template>

<script lang="ts">
import { ref, reactive, toRefs, onMounted, computed, watch } from "vue";
import parcels from "@/use/parcels";
import router from "@/router";
import RecipientColumn from "@/views/Admin/Parcels/RecipientColumn.vue";
import ParcelColumn from "@/views/Admin/Parcels/ParcelColumn.vue";
import { TableStructure } from "@/@types/Interface";
import PagerInterface from "@/@types/PagerInterface";
import useList from "@/use/useList";
import UserList from "@/views/Admin/Components/UserList.vue";
import useParcelListActions from "@/views/Admin/Parcels/use-parcel-list-actions";
import LabelViewer from "@/views/Admin/Components/Label/LabelViewer.vue";
import EditTracking from "@/views/Guests/Track/EditTracking.vue";
import ParcelFormPrompt from "@/views/Admin/Parcel/ParcelFormPrompt.vue";
export default {
  components: {
    EditTracking,
    RecipientColumn,
    ParcelFormPrompt,
    UserList,
    ParcelColumn,
    LabelViewer,
  },
  props: {
    query: Object,
    title: { default: "Parcels" },
    list: Object,
  },
  setup(props, ctx) {
    onMounted(() => {
      initialize();
    });
    const tableWorker = props.list ?? useList();
    const userls = ref();
    const parcelForm = ref();
    const labelRef = ref();
    const trackingEditor = ref();
    tableWorker.initialize(
      [],
      parcels.transform,
      useParcelListActions({
        userls,
        parcels,
        tableWorker,
        labelRef,
        trackingEditor,
        parcelForm,
      })
    );

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
      const _data = await parcels.fetchMany(
        Object.assign({}, props.query ?? {}, router.currentRoute.value.query)
      );
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
      trackingEditor,
      userls,
      labelRef,
      parcelForm,
      ...toRefs(data),
      isLoading: computed(() => parcels.loading.value),
      structure,
      parcels,
      openModal: ref(true),
      tableWorker,
      updateRecipient: async (item, user) => {
        await parcels.updateParcelRecipient(item.track_code, user, tableWorker);
      },
    };
  },
};
</script>

<style scoped></style>
